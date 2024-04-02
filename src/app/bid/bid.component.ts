import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrl: './bid.component.css'
})
export class BidComponent implements OnInit{

  constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute) {}

  imageUrl = '';
  model = {
    paintingId: 0,
    email: '',
    price: 0
  };

  errorMessage = '';
  atou = false;
  showMessage = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (value: any) => {
        if (value.imageUrl && value.paintingId) {
          this.imageUrl = value.imageUrl;
          this.model.paintingId = value.paintingId;
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  bid() {
    this.errorMessage = '';

    if (!this.model.email) {
      this.errorMessage = "email kell";
      return;
    }
    if (!this.model.price) {
      this.errorMessage = "ár kell";
      return;
    }
    if (!this.atou) {
      this.errorMessage = "elfogadás kell";
      return;
    }

    this.httpService.sendBid(this.model).subscribe({
      next: () => {
        this.showMessage = true;
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message ?? err.message;
      }
    })
  }
}
