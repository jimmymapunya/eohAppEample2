import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {DetailsPage} from '../details/details';
import {ElementRef,Renderer2} from '@angular/core';
//@ViewChild('test') el:ElementRef;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: any;
  speciesItem: any;
  private searchQuery: string = '';
  private items: string[];
  next: any;
  page: any;

  constructor(public navCtrl: NavController, private http: Http) {
    this.page = 1;
     do
    {
        this.initializeItems();
        this.http.get('http://swapi.co/api/people/?page='+this.page).map(res => res.json()).subscribe(data => {
       
            this.posts = data.results;
            this.next = data.next;
            this.page++;

        });
    
    }while(this.next != null)  

   this.getSpecies();
  }

  initializeItems() {
    this.items = this.posts;
  }

  //process species URl and display the data
  getSpecies()
  {
    this.initializeItems();
            this.http.get('http://swapi.co/api/species/?page='+this.page).map(res => res.json()).subscribe(data => {
            this.speciesItem = data.results;
            
        });

  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  // click view on the list and see item details
  viewItem(item)
  {
    this.navCtrl.push(DetailsPage, {
      item:item
    });

  }

}
