import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from 'src/app/shared/services/user/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/shared/services/posts/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  updateForm: FormGroup;
  @Input() posts: any = [];
  user: any = {};
  userA: any = {};
  userB: any = {};
  follows: boolean = false;
  followers: number = 0;
  following: number = 0;
  myUsername: boolean = false;
  isVisible: boolean = false;
  file: any;
  filename: string = '';
  dataUrl: string = '';
  imageProfile: string = '';
  @ViewChild('imageElement') imageElement: any;

  constructor(
    private userService: UserServiceService,
    private postService: PostService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      name: [''],
      username: [''],
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(6)]],
      age: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('username') === this.route.snapshot.url[2].path) {
      this.myUsername = true;
    }
    this.userService.getUserByUsername(this.route.snapshot.url[2].path).subscribe((res: any) => {
      this.imageProfile = res.imageUrl;
      // console.log(this.imageProfile);
    });
    this.userService
      .getUserPostProfile(this.route.snapshot.url[2].path)
      .subscribe((response: any) => {
        this.posts = response;
      });

    this.userService
      .getUserByUsername(this.route.snapshot.url[2].path)
      .subscribe((response: any) => {
        this.user = response;
        this.followers = response.followers.length;
        this.following = response.follows.length;
        if(response.imageUrl == null){
          this.imageProfile = '/assets/ProfileImage.png';
        }else{
          this.imageProfile = environment.profileImage + response.imageUrl;
        }
      });
    this.isFollowing();
  }

  followUser() {
    this.userService
      .getUserByUsername(this.route.snapshot.url[2].path)
      .subscribe((response: any) => {
        this.userService
          .followUser(localStorage.getItem('username') || '', response._id)
          .subscribe((res: any) => {
            this.follows = true;
          });
      });
  }

  unfollowUser() {
    this.userService
      .getUserByUsername(this.route.snapshot.url[2].path)
      .subscribe((res: any) => {
        this.userService
          .unfollowUser(localStorage.getItem('username') || '', res._id)
          .subscribe((result) => {
            // console.log('User Unfollowed');
            this.follows = false;
          });
      });
  }

  isFollowing() {
    this.userService
      .getUserByUsername(localStorage.getItem('username') || '')
      .subscribe((res) => {
        this.userA = res;
        this.userService
          .getUserByUsername(this.route.snapshot.url[2].path)
          .subscribe((res) => {
            this.userB = res;
            this.userA.follows.filter((user: any) => {
              if (user === this.userB._id) {
                this.follows = true;
              }
            });
            return this.follows;
          });
      });
  }

  updateUser() {
    const data = this.updateForm.getRawValue();

    this.userService
      .updateUser(localStorage.getItem('username') || '', data)
      .subscribe((res) => {
        if (data.username) {
          localStorage.setItem('username', data.username);
          this.router.navigate([
            'home/user/' + localStorage.getItem('username'),
          ]);
          this.isVisible = !this.isVisible;
          window.location.reload();
        } else {
          this.router.navigate([
            'home/user/' + localStorage.getItem('username'),
          ]);
          this.isVisible = !this.isVisible;
          window.location.reload();
        }
      });
  }

  updateProfile() {
    this.isVisible = !this.isVisible;
  }

  doOnChange(target: any){
    const data = this.updateForm.getRawValue();
    const file = target.files[0];

    var formData = new FormData();
    formData.append('profImg', file,);

    this.userService.updateProfileImage2(this.route.snapshot.url[2].path, formData, data).subscribe((res: any) => {
      this.userService.getUserByUsername(this.route.snapshot.url[2].path).subscribe((result: any) => {
        this.imageProfile = environment.profileImage + result.imageUrl;
      });
    });
  }

  deletePost(id: string) {
    this.postService.deletePost(localStorage.getItem('username') || '',id).subscribe((res) => {
      console.log(res);
      window.location.reload();
    });
  }

  sendId(id: string) {
    localStorage.setItem('id', id);
  }
}
