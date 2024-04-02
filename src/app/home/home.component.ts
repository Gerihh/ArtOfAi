import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  categories: any[] = [];
  paintings: any[] = [];
  bids: any[] = [];
  categoryId = '';

  constructor(private httpService: HttpService, private router:Router) {}

  ngOnInit() {
    this.httpService.getCategories().subscribe({
      next: (result: any[]) => this.categories = result,
      error: (err: any) => console.log(err)
    });
  }

  selectCategory() {
    this.httpService.getPaintingsByCategory(this.categoryId).subscribe({
      next: (result: any[]) => this.paintings = result,
      error: (err: any) => console.log(err)
    });
  }

  showBids(paintingId: number) {
    this.bids = [];
    this.httpService.getBidsByPainting(paintingId).subscribe({
      next: (result: any[]) => this.bids = result,
      error: (err: any) => console.log(err)
    });
  }

  bid(paintingId: number, imageUrl: string) {
    this.router.navigate(['/bidding'], {queryParams: {
      paintingId: paintingId,
      imageUrl: imageUrl
    }});
  }
}
