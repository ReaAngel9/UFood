import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/shared/services/posts/post.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  file: any;
  filename: string = '';
  imagePost: string = '';
  postForm: FormGroup;
  constructor(private fb: FormBuilder, private postService: PostService, private dialogRef: MatDialogRef<DialogComponent>, private route: ActivatedRoute,) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      ingredients: ['', Validators.required],
      description: ['', Validators.required],
      procedure: ['', Validators.required],
      image: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  createPost() {
    // console.log(localStorage.getItem('username'));
    this.postService.createPost(localStorage.getItem('username') || '', this.postForm.value).subscribe((res: any) => {
      // console.log(res);
      this.postService.addPostToUser(localStorage.getItem('username') || '', res).subscribe((data: any) => {
        // console.log(data);
      });
    });
    this.dialogRef.close();
  }

  // doOnChange(target: any){
  //   const data = this.postForm.getRawValue();
  //   const file = target.files[0];

  //   var formData = new FormData();
  //   formData.append('postImg', file,);

  //   this.postService.updateProfileImage2(formData).subscribe((res: any) => {
  //     // console.log(res);
  //     this.postService.addPostToUser(localStorage.getItem('username') || '', data).subscribe((result: any) => {
  //       // console.log(result);
  //       this.imagePost = result.imageUrl;
  //       // console.log(this.imageProfile);
  //     });
  //   });
  // }

  cancel() {
    this.postForm.reset();
  }
}
