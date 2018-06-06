import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(private setting: SettingService) { }

  traySave: boolean;
  tooltipSave: boolean;
  ngOnInit() {
    // console.log(`${this.setting.getTooltipValue()}----${this.setting.getTrayValue()}`);
    this.tooltipSave = this.setting.getTooltipValue();
    this.traySave = this.setting.getTrayValue();
  }

  setTooltipValue(value) {
    this.setting.setTooltipValue(value);
    this.setting.showTooltip.next(value);
  }
  setTrayValue(value) {
    this.setting.setTrayValue(value);
  }

}
