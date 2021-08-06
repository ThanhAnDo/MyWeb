// Start: Modal > Member
$(document).ready(function () {
  $("#member").click(function () {
    $("#memberModal").modal();
  });
});
// End: Modal > Member

// Start: Categories Slide-Box
$(".sub-menu ul").hide();
$(".sub-menu a").click(function () {
  $(this).parent(".sub-menu").children("ul").slideToggle("100");
  $(this).find(".right").toggleClass("fa-caret-up fa-caret-down");
});
// End: Categories Slide-Box


// Start: Navbar Transform on-scroll
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("header").style.height = "70px";
    document.getElementById("header").style.padding = "1px";
    document.getElementById("header").style.background = "white";
  } else {
    document.getElementById("header").style.height = "110px";
    document.getElementById("header").style.padding = "30px";
    document.getElementById("header").style.background = "#ffe5d8";
  }
}
// End: Navbar Transform on-scroll


// json code
$(document).ready(function () {
  var data = [];
  $.getJSON("data-catagory.json", function (items) {
    data = items;

    showImage(data);
  });

  //Start: Detail-Item Modal
  $(document).on("click", ".productImg", function () {
    let id = $(this).data("id");

    let product = data.filter((ele) => ele.pdid == id);

    showModal(product[0]);
    $("#showModal").modal("show");
  });
    //End: Detail-Item Modal

// Start: JSON Code / truyền data từ JSON file
    function showImage(items) {
        let s = [];
        
    $.each(items, function (e, json) {
      //s.push(`<div class='col-lg-3 col-md-6 w3-center'>`);
      s.push(`<div class="element_gifts" data-name="${json.pdname}" data-id="${json.pdid}" data-item="${json.pdcatogery}" data-brand="${json.pdbrand}" data-size="${json.pdsize}" data-weight="${json.pdweight}" data-color="${json.pdcolor}" data-price="${json.pdprice}">
            
            <img src="${json.pdimage}" data-id="${json.pdid}" class="productImg" alt=""><br>                 
                   
            <p></p>${json.pdname}</p>
            <p>${json.pdprice}</p>           
            
            <hr>
            <button data-id="${json.pdid} href="#" class="btn btn-black more">
                  Compare <i class="glyphicon glyphicon-plus"></i>
            </button>                 
            
            <button class="btn btn-pink btn-buy-now">
                  Add to
                  <i class="glyphicon glyphicon-shopping-cart"></i>
            </button>
            
            </div>
            `);
    });
    $("#products").html(s.join(" "));
    element_gifts = document.querySelectorAll(".element_gifts");
  }
// End: JSON CODE


//START COMPARE
  var list = [];

  $(document).on("click", ".more", function () {
    $(".comparePanle").show();
    $(this).toggleClass("rotateBtn");
    $(this).parents(".element_gifts").toggleClass("selected");
    var productID = $(this).parents(".element_gifts").attr("data-id");

    var inArray = $.inArray(productID, list);

    if (inArray < 0) {
      if (list.length < 3) {
        list.push(productID);

        var displayTitle = $(this).parents(".element_gifts").attr("data-name");

        var image = $(this).siblings(".productImg").attr("src");

        $(".comparePan").append(
          '<div id="' +
            productID +
            '"class="relPos titleMargin w3-margin-bottom col-lg-4 col-md-4 col-sm-4"><div class="w3-white titleMargin"><a class="selectedItemCloseBtn w3-closebtn pointer-cursor">&times</a><img src="' +
            image +
            '" alt="image" style="width: 100%"/><p id="' +
            productID +
            '" class="titleMargin1">' +
            displayTitle +
            "</p></div></div>"
        );
      } else {
        $("#WarningModal").modal();

        $(this).toggleClass("rotateBtn");
        $(this).parents(".element_gifts").toggleClass("selected");
        return;
      }
    } else {
      list.splice($.inArray(productID, list), 1);
      $("#" + productID).remove();
      hideComparePanel();
    }

    if (list.length > 1) {
      $(".cmprBtn").addClass("active");
      $(".cmprBtn").removeAttr("disabled");
    } else {
      $(".cmprBtn").removeClass("active");
      $(".cmprBtn").attr("disabled", "");
    }
  });

  /*function Click button Compare then show comparision*/
  $(document).on("click", ".cmprBtn", function () {
    if ($(".cmprBtn").hasClass("active")) {
      /* this is to print the  features list statically*/
      $(".contentPop").append(
        '<div class="col-sm-3 col-md-3 compareItemParent relPos">' +
          '<ul class="product">' +
                '<li class="relPos compHeader"></li>' +
                "<li><b>Name</b></li>" +
                "<li><b>Item</b></li>" +
                "<li><b>Size</b></li>" +
                "<li><b>Weight</b></li>" +
                "<li><b>Color</b></li>" +
                "<li><b>Price</b></li>"+
            "</ul>" +
          "</div>"
      );

      for (var i = 0; i < list.length; i++) {
        /* this is to add the items to popup which are selected for comparision */
        product = $('.element_gifts[data-id="' + list[i] + '"]');
        var image = $("[data-id=" + list[i] + "]")
          .find(".productImg")
          .attr("src");
        var title = $("[data-id=" + list[i] + "]").attr("data-name");
        /*appending to div*/
        $(".contentPop").append(
          '<div class="col-sm-3 col-md-3 compareItemParent relPos">' +
                '<ul class="product">' +
                    '<li class="compHeader"><img src="' + image +'" class="compareThumb"></li>' 
                    +
                    "<li>" + title + "</li>" 
                    +
                    "<li>" + $(product).data("item") + "</li>" 
                    +
                    "<li>" + $(product).data("size") + "</li>" 
                    +
                    "<li>" + $(product).data("weight") + "</li>"
                    + 
                    "<li>" + $(product).data("color") + "</li>" 
                    +
                    "<li>" + $(product).data("price") + "</li>" 
                    +
                "</ul>" +
            "</div>"
        );
      }
    }
    $(".modPos").show();
  });

  /* function to close the comparision popup */
  $(document).on("click", ".closeBtn", function () {
    //console.log(e);
    $(".contentPop").empty();
    $(".comparePan").empty();
    $(".comparePanle").hide();
    $(".modPos").hide();
    $(".selectProduct").removeClass("selected");
    $(".cmprBtn").attr("disabled", "");
    list.length = 0;
    $(".rotateBtn").toggleClass("rotateBtn");
  });

  /*function to remove item from preview panel*/
  $(document).on("click", ".selectedItemCloseBtn", function () {
    var test = $(this).siblings("p").attr("id");
    $("[data-id=" + test + "]")
      .find(".more")
      .click();
    hideComparePanel();
  });

  function hideComparePanel() {
    if (!list.length) {
      $(".comparePan").empty();
      $(".comparePanle").hide();
    }
  }
  //END COMPARE

  //Animation Click add cart  
  $(document).on("click",".btn-buy-now",function(e)
  {
      e.preventDefault();
      
      var parent = $(this).parents(".element_gifts");
      var cart = $(document).find("#cart-shop");
      
      var src = parent.find("img").attr("src");
      

      var parTop = parent.offset().top;
      var parLeft = parent.offset().left;
      
      $('<img />',
      {
          class:'flyImg',
          src: src
      }).appendTo("body").css({
          'top' : parTop,
          'left': parLeft + parent.width() - 50
      });

      setTimeout(function()
      {
          $(document).find(".flyImg").css({
              'top' : cart.offset().top,
              'left': cart.offset().left
          });
          setTimeout(function()
          {
              $(document).find(".flyImg").remove();
              var count = parseInt(cart.find("#count-item").data("count"))+1;
              cart.find("#count-item").text(count + ' Item').data("count",count);
          },1000);
      },500);
  });
});

//Modal
function showModal(json) {
  let s = `
    <div class="row">
        <div class="col-sm-7 col-md-7 col-lg-7">
            <div><img src="${json.pdimage}" style="width: 95%; border: 3px solid black"  alt=""></div>
        </div>
        <div class="col-sm-5 col-md-5 col-lg-5 modal-item-detail">
            <h3 style="color: black; text-align: center;"><b>${json.pdname}</b></h3>
            <hr>
            <p><b>Price:</b> ${json.pdprice}</p>
            <p><b>ID:</b> ${json.pdid}</p>
            <p><b>Catogery:</b> ${json.pdcatogery}</p>
            <p><b>Brands:</b> ${json.pdbrand}</p>
            <p><b>Material:</b> ${json.pdmaterial}</p>
            <p><b>Color:</b> ${json.pdcolor}</p>
            <p><b>Size:</b> ${json.pdsize}</p>
            <p><b>Weight:</b> ${json.pdweight}</p>
            <p><b>Package:</b> ${json.pdpackage}</p>
            <p><b>Details:</b> ${json.pdspec}</p>
            
        </div>
    </div>           
    `;

  $(".modal-item").html(s);
}

//START FILTER CATEGORIES

var element_gifts = document.querySelectorAll(".element_gifts");
const filter_button = document.querySelectorAll("#filter_button .filter");
const filter_brand = document.querySelectorAll(".filter-brand");
//console.log(filter_button);

//FILLTER BY EVENT CLICK id#filter_button

filter_button.forEach(function (e) {
  e.addEventListener("click", function (e1) {
    //Click to get data filter
    let button_filter = e1.target.dataset.filter;
    //console.log(button_filter);
    element_gifts.forEach(function (e2) {
      let element_filter = e2.dataset.item;

      if (button_filter === element_filter || button_filter === "all") {
        e2.style.display = "block";
      } else {
        e2.style.display = "none";
      }
    });
  });
});

//FILTER BY BRANDS
filter_brand.forEach(function (e) {
  e.addEventListener("click", function (e1) {
    let button_brand = e1.target.dataset.filter;
    //console.log(button_brand);
    element_gifts.forEach(function (e2) {
      let element_filter = e2.dataset.brand;
      //console.log(element_filter);

      if (button_brand === element_filter || button_brand === "all") {
        e2.style.display = "block";
      } else {
        e2.style.display = "none";
      }
    });
  });
});



// Disable Code / Code vô hiệu hóa ------------------------------

//Modal click on More Details / Hàm click vào link hiện chi tiết sản phẩm
//   $(document).on("click", ".moreDetails", function () {
//     let id = $(this).data("id");

//     let product = data.filter((ele) => ele.pdid == id);

//     showModal(product[0]);
//     $("#showModal").modal("show");
//   });

//FILTER BY BRANDS / Lọc theo thương hiệu
  // $("input[type=checkbox]").click(function()
  // {
  //   let check = $("#check-brands:checked").map(function()
  //   {
  //     return $(this).val()
  //   }).toArray().toString();

  //   let subdata = (check.length==0)?data: data.filter(item => check.search(item.pdbrand) >= 0);

  //   showImage(subdata);
  // });