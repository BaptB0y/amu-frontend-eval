import {Component, EventEmitter, OnInit, Output} from "@angular/core";

@Component({
  selector:'app-search',
  template:`
    <div class="input-group mb-3" style="width: 40%; margin-left:30%">
      <div class="input-group-prepend">
        <span class="input-group-text">🔎</span>
      </div>
      <input type="text" class="form-control" placeholder="Rechercher..." [(ngModel)]="enteredSearchValue" (input)="onSearchTextChanged()">
    </div>
  `
})
export class SearchComponent implements OnInit{

  constructor() {}

  ngOnInit() {}
  enteredSearchValue: string ='';

  @Output()
  searchTextChanged = new EventEmitter<string>();

  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSearchValue);
  }

}
