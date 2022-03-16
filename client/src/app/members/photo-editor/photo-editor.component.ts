import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberServiceService } from 'src/app/_services/member-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member;
  uploader: FileUploader
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;
  hasAnotherDropZoneOver:boolean;
  response:string;
 
  constructor (private accountSvc: AccountService, private memberSvc: MemberServiceService){

    this.accountSvc.currentUser$.pipe(take(1)).subscribe(user => this.user = user);

    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10*1024*1024,
      // disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      allowedFileType:['image']

    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      console.log(response);
      
      if (response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
      }
    }
 
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;
 
    this.response = '';
 
    // this.uploader.response.subscribe( res => this.response = res );
  }
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  ngOnInit(): void {
    
  }

  setMainPhoto(photo: Photo){
    this.memberSvc.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.accountSvc.setCurrentUser(this.user);
      this.member.photoUrl =photo.url;
      this.member.photos.forEach(p=> {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
      })
    });
  }
  deletePhoto(photoId: number) {
    this.memberSvc.deletePhoto(photoId).subscribe(() =>{
      this.member.photos = this.member.photos.filter(x=> x.id != photoId);
    });
  }

}
