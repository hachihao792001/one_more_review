import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Movie } from 'src/app/models/movie';
import { FilmService } from 'src/app/services/film.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommentService } from 'src/app/services/comment.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
})
export class FilmComponent implements OnInit {
  film!: Movie;
  comments: any[] = [];
  reviews: any[] = [];
  iframeUrl!: SafeResourceUrl;

  yourComment: string = '';
  yourReview: string = '';
  reviewScore: number = 1;

  constructor(
    private filmService: FilmService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer,
    private commentService: CommentService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: string = params.get('id') || '';
      this.filmService.getFilm(id).subscribe((res) => {
        this.film = res.film;
        console.log(this.film);
        this.spinner.hide().then();
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.film.url
        );

        for (let commentId of this.film.commentList) {
          this.commentService.getComment(commentId).subscribe(
            (res) => {
              this.comments.push(res.comment);
            },
            (err) => {
              console.log(err);
            }
          );
        }

        for (let reviewId of this.film.reviewList) {
          this.reviewService.getReview(reviewId).subscribe(
            (res) => {
              this.reviews.push(res.review);
            },
            (err) => console.log(err)
          );
        }
      });
    });
  }

  postComment() {
		this.spinner.show().then();
    const data = {
      idFilm: this.film._id,
      content: this.yourComment,
    };
    this.commentService.postComment(data).subscribe(
      (res) => {
        console.log(res);
        this.comments.push(res.comment);
        this.yourComment = '';
				this.spinner.hide().then();
      },
      (err) => {
        console.log(err);
				this.spinner.hide().then();
      }
    );
  }

  postReview() {
		this.spinner.show().then();
    const data = {
      rating: this.reviewScore.toString(),
      idFilm: this.film._id,
      content: this.yourReview,
    };
		console.log(data);
    this.reviewService.postReview(data).subscribe(
      (res) => {
        console.log(res);
        this.reviews.push(res.review);
        this.yourReview = '';
				this.spinner.hide().then();
      },
      (err) => {
        console.log(err);
				this.spinner.hide().then();
      }
    );
  }
}
