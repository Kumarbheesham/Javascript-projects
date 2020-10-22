var budgetController = (function(){
    
    var Expense  = function(id, description, value){
        this.id          = id;
        this.description = description;
        this.value       = value;
    };
    
    var Income  = function(id, description, value){
        this.id          = id;
        this.description = description;
        this.value       = value;
    };
    
    var budgetCalculate = function(type){
      
        var sum =0;
        data.allItems[type].forEach(function(curr){
           sum += curr.value; 
        });
        
        data.totals[type] = sum;
    };
    
    var data = {
        
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };
    
    return {
        addItem: function(type, des, val){
            var newItem, ID;
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else{
                ID = 0;
            }
     
            
            // add items according to exp and inc
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc'){
                newItem = new Income(ID, des, val);
            }
            
            // add additem into the data
            data.allItems[type].push(newItem);
            
            // return new element
            return newItem;
            
                
        }, 
        
        deleteItem: function(type,id){
        var ids, index;
        // id =6
        // data.allitems[type][id]
        // ids = [1 2 4 8]
        // index = 3
        
        
        ids = data.allItems[type].map(function(current){
            return current.id;
        });
        
        index = ids.indexOf(id);
        
        if(index !== -1 ){
            data.allItems[type].splice(index,1);
        }
        
        
        },
        calculateBudget: function(){
            
            // Calculate total income and expenses
            budgetCalculate('exp');
            budgetCalculate('inc');
            
            //calculate the budget: income and expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            //calculate the percentage of income that we spent and check if we are not dividing exp with 0 inc which will result in infinity
            if (data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc)*100);
            }else {
                data.percentage = -1;
            }
            
            
        },
        
        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },
        testMethod: function(){
            console.log(data);
        }
    };



})();


var UIController = (function(){
    
    var DOMString = {
      inputType:   '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value', 
      inputBtn: '.add__btn',
      incomeContainer: '.income__list',
      expenseContainer: '.expenses__list',
      budgetLabel: '.budget__value',
      incomeLabel: '.budget__income--value',
      expenseLabel: '.budget__expenses--value',
      percentageLabel: '.budget__expenses--percentage',
      container: '.container'
    };
    
    return   {
        
        getinput: function(){
            return{
                Type: document.querySelector(DOMString.inputType).value,
                Description: document.querySelector(DOMString.inputDescription).value,
                Value : parseFloat(document.querySelector(DOMString.inputValue).value)
            };     
                    
        },
        
        addListItems: function(obj, type){
            var html,element, newHtml;
            
            //Create HTML string with placeholder text
            if (type === 'inc'){
                element = DOMString.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if (type === 'exp'){
                element = DOMString.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
                               
            
            //Replace the placeholder text with some actual data
            
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',obj.value);
            
            //Insert the HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
        },
        
        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMString.inputDescription + ',' + DOMString.inputValue);
            // fields is a list return by javascript so need to convert it to array to apply array methods
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });
            
            fieldsArr[0].focus();
        },
        
        displayBudget: function(obj){
            
            document.querySelector(DOMString.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMString.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMString.expenseLabel).textContent = obj.totalExp;
            if(obj.percentage > 0 ){
                document.querySelector(DOMString.percentageLabel).textContent = obj.percentage + '%';
            }else {
                document.querySelector(DOMString.percentageLabel).textContent = '---';
            }
            
        },
        
        getDOMString: function(){
            return DOMString;
        }
            
                
    };

})();

var Controller = (function(UICtrl, budgetCtrl){
    
    var setupEventListener = function(){
        var DOM = UICtrl.getDOMString();
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItems);


        document.addEventListener('keypress', function(event){

            if (event.keyCode === 13 || event.which === 13 ){
            ctrlAddItems();
                
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItems);
        }

        });
    };
    
    var ctrlDeleteItems = function(event){
      var itemID;
      itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;  
        
      if (itemID){
          // inc-1
          splitID = itemID.split('-');
          type = splitID[0];
          ID = parseInt(splitID[1]);
          
          //1. delete the items from data structure
          budgetCtrl.deleteItem(type, ID);
          
          //2. delete the item from UI
          
          //3. Update and show the new budget
      }
    };
    var budgetCalculate = function(){
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        
        // 2. return the budget
        var budget = budgetCtrl.getBudget();

        // 5. Display the budget on UI
        UICtrl.displayBudget(budget);
        
    };
    var ctrlAddItems = function(){
        var addedItem, inputFields;
       // 1. Get the field input data
       inputFields = UICtrl.getinput();
        
       if(inputFields.Description !== "" && !isNaN(inputFields.Value) && inputFields.Value > 0){
           // 2. Add the item to the budget controller
           addedItem = budgetCtrl.addItem(inputFields.Type, inputFields.Description, inputFields.Value);

          // 3. Add the item to the UI
          UICtrl.addListItems(addedItem,inputFields.Type );
          // 4. Clearning the fields

          UICtrl.clearFields();

         // 5. culculate and update the budget
          budgetCalculate();
       
       }    
            
   }
    
   return {
       init: function(){
           console.log('program has started. ');
           UICtrl.displayBudget({
               budget: 0,
               totalInc: 0,
               totalExp: 0,
               percentage: -1
           });
           setupEventListener();
       }
       
   };

  

})(UIController, budgetController);

Controller.init();
