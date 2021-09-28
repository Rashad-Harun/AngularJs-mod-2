
(function(){

    'use strict';

    angular.module('ShoppingListApp', [])
    .controller('ShoppingListToBuy', ShoppingListToBuy)
    .controller('ShoppingListCheckoff', ShoppingListCheckoff)
    .service('ShoppingListService', ShoppingListService)





    // First Shopping list controller                      -1-
    ShoppingListToBuy.$inject = ['ShoppingListService']
    function ShoppingListToBuy(ShoppingListService){
        let list = this;
        let shoppingList = ShoppingListService;

        list.itemName = '';
        list.itemQuantity = '';
        // list.itemMessage = 'Add item to the List 🛒';

        list.addItem = function(){
            shoppingList.addItem(list.itemName, list.itemQuantity)
            list.itemName = '';
            list.itemQuantity = '';
            // list.itemMessage = '';
        };

        list.removeItem = function(itemIndex){
            shoppingList.removeItem(itemIndex)
        };

        list.boughtItem = function(itemIndex){
            shoppingList.boughtItem(itemIndex)
        };

        
        list.items = shoppingList.getItems();
        
        list.$doCheck = function(){
            if(list.items.length > 0){
                list.itemMessage = '';
            }
            else{
                list.itemMessage = 'Everything is bought, Add new item to the List 🛒';
            }
        }
    };



    // Second Shopping list controller                      -2-
    ShoppingListCheckoff.$inject = ['ShoppingListService']
    function ShoppingListCheckoff(ShoppingListService){
        let list = this;
        let shoppingList = ShoppingListService;

        

        list.boughtItems = shoppingList.getBoughtItems();
        
        

        list.$doCheck = function(){
            if(list.boughtItems.length > 0){
                list.boughtMessage = '';
            }
            else{
                list.boughtMessage = 'Nothing bought yet ⭕';
            }
        }


        list.removeItem = function(itemIndex){
            shoppingList.removeBoughtItems(itemIndex)
        };
    };



    // Custome service function
    function ShoppingListService(){
        let service = this;
        let items = [];
        let boughtItems = [];


        items.push({name: 'Orange', quantity: '3 kilos'})
        items.push({name: 'Apple', quantity: '1 kilos'})
        items.push({name: 'Banana', quantity: '5 kilos'})
        items.push({name: 'Kiwi', quantity: '0.5 kilos'})
        items.push({name: 'Milk', quantity: '1 bottle'})
        items.push({name: 'Honey', quantity: '1 kilo'})

        // function to add items to the list items
        service.addItem = function(itemName, itemQuantity){
            let item = {
                name: itemName,
                quantity: itemQuantity
            };
            items.push(item);
        };

        service.boughtItem = function(itemIndex){
            let removedItem = items[itemIndex]
            boughtItems.push(removedItem)
            items.splice(itemIndex, 1)
        };

        service.removeItem = function(itemIndex){
            items.splice(itemIndex, 1)
        };


        service.getItems = function(){
            return items
        };

        service.getBoughtItems = function(){
            return boughtItems
        };

        service.removeBoughtItems = function(itemIndex){
            boughtItems.splice(itemIndex, 1)
        };

    };




})();





// if((maxItems === undefined) || (maxItems !== undefined) && (items.length < maxItems)){
                
//     let item = {
//         name: itemName,
//         quantity: itemQuantity
//     };
//     items.push(item);
// } else{
//     throw new Error(`Max items is ${maxItems}`)
// }