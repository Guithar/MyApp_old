import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-asset-skeleton',
  templateUrl: './asset-skeleton.component.html',
  styleUrls: ['./asset-skeleton.component.css']
})
export class AssetSkeletonComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }
  backClicked() {
    this._location.back();
  }
}
