import { Component, OnInit, Input } from '@angular/core';
import { MaintForList } from 'src/app/_models/maintForList';
import { MaintService } from 'src/app/_services/maint.service';
import { AssetService } from 'src/app/_services/asset.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-client-maint-list',
  templateUrl: './client-maint-list.component.html',
  styleUrls: ['./client-maint-list.component.css']
})
export class ClientMaintListComponent implements OnInit {
  @Input() clientId: number;
  maints: MaintForList[];


  constructor(private maintService: MaintService,
    private assetsService: AssetService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.maints = data['maints'];
    });

    this.loadMaints();
  }

  loadMaints() {
    this.maintService.getMaints(this.clientId)
    .subscribe({
      next: (result: any) => {
        console.log('result');
        this.maints = result;
        console.log(this.maints);
      },
      error: (err: any) => {
        console.log('error');
        console.log(err);
      },
      complete: () => {
      console.log('complete');
      console.log(this.maints);
      }
      });
  }
}
