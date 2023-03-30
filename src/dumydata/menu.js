export class Menu{
    constructor(){
        this.list=[];
        
        this.category_push('한식');
        this.category_push('양식');
        this.category_push('일식');
        this.category_push('중식');
        this.category_push('분식');
        this.category_push('패스트푸드');
        this.category_push('디저트');

        const k_bob=['다모아한식','행복한밥집','미화식당','농부가','새마을식당'];
        const df=[4000,5000,3500,3000,3500,3900];

        for(let i=0; i<k_bob.length; i++){
            this.shop_push(0,k_bob[i],df[i]);
        }

        const menu_name=['돼지불백','오삼불고기','뚝배기불고기','갈비탕','된장국','김치찌개'];
        const menu_price=[7000,7500,8000,12000,7000,7000];
        const menu_intro=['공기밥+국+3가지반찬+돼지불고기','공기밥+국+3가지반찬+오삼불고기','공기밥+국+3가지반찬+뚝배기불고기','공기밥+갈비탕+계란찜+3가지반찬','공기밥+된장찌개+계란찜+3가지반찬','공기밥+김치찌개+계란찜+3가지반찬'];
        
        for(let j=0; j<5; j++){
            for(let i=0; i<menu_name.length; i++){
                this.menu_push(0,j,menu_name[i],menu_price[i],menu_intro[i]);
            }
        }
    }
    category_push(category){
         this.list.push({
            menu:category,
            shop:[],
         });
    }
    shop_push(i,title,d_p){
        this.list[i].shop.push({
            title:title,
            menu:[],
            delivery_price:d_p,
        });
    }
    menu_push(i,j,name,price,intro){
        this.list[i].shop[j].menu.push({
            name:name,
            price:price,
            intro:intro,
        });
    }
}