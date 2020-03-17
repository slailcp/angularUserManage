import { Component, OnInit } from '@angular/core';
import { Store,select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from 'src/app/ngrx/actions/count.action';
import * as fromReducer from 'src/app/ngrx/reducers/index';
import * as countducer from 'src/app/ngrx/reducers/count.reducer';

@Component({
  selector: 'fj-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrls: ['./ngrx.component.css']
})
export class NgrxComponent implements OnInit {
  countInfo$:Observable<countducer.State>
  selectFeatureCount$:Observable<string>
  getCount$:Observable<number>
  selectFeatureCounts$:Observable<number>


  constructor(private store:Store<fromReducer.State>) { 
    this.countInfo$ = store.pipe(select('countInfo'));
    this.selectFeatureCount$ = store.pipe(select((()=>fromReducer.selectFeatureCount)()));
    this.selectFeatureCount$.subscribe(item=>console.log(`selectFeatureCount:${item}`));

    this.getCount$ = store.pipe(select(fromReducer.getCount(), { id: 'count', multiply: 2 }));
    this.getCount$.subscribe(item=>console.log(`getCount:${item}`));

    this.selectFeatureCounts$ = store.pipe(select(fromReducer.selectFeatureCounts()));
    this.selectFeatureCounts$.subscribe(item=>console.log(`selectFeatureCounts:${item}`));

  }

  ngOnInit() {
  }

  increment() {this.store.dispatch(increment());}
  decrement() {this.store.dispatch(decrement()); }
  reset() {this.store.dispatch(reset({count:10}))}
  

}
