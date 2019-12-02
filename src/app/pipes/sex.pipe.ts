import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sexTransform' })
export class SexPipe implements PipeTransform {
  transform(sex:string|number,format:string) {
   sex = Number(sex)
     if(format&&format==='ch'){
        return sex===0?'男':'女';
     }else if(format&&format==='en'){
        return sex===0?'man':'woman';
     }else if(format&&format==='wl'){
        return sex===0?'汉子':'妹子';
     }else{
        return sex;
     }
  }
}