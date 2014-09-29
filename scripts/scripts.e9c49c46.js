"use strict";angular.module("projectVApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","leaflet-directive","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/news",{templateUrl:"views/news.html"}).when("/plan",{templateUrl:"views/plan.html"}).when("/demo",{templateUrl:"views/demo.html"}).when("/join",{templateUrl:"views/join.html",controller:"JoinCtrl"}).when("/mission/:county",{templateUrl:"views/mission.html",controller:"MissionCtrl"}).when("/map/:county",{templateUrl:"views/map.html",controller:"MapCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("projectVApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("projectVApp").controller("JoinCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("projectVApp").controller("MissionsCtrl",["$scope",function(a){a.missions=[{id:"TPE-4",name:"TPE-4",description:"童些趣錯事立報式而變受……論技麼康應居孩了定同大李本天心備，方告那下好當放一的科不復多神分發自原事慢費日華國心風出和夜大"},{id:"TPQ-1",name:"TPQ-1",description:"童些趣錯事立報式而變受……論技麼康應居孩了定同大李本天心備，方告那下好當放一的科不復多神分發自原事慢費日華國心風出和夜大"},{id:"TPQ-6",name:"TPQ-6",description:"童些趣錯事立報式而變受……論技麼康應居孩了定同大李本天心備，方告那下好當放一的科不復多神分發自原事慢費日華國心風出和夜大"}]}]),angular.module("projectVApp").controller("PagesCtrl",["$scope","$location",function(a,b){a.pages=[{id:"",name:"首頁",href:"#/"},{id:"news",name:"戰略消息"},{id:"plan",name:"罷免日計劃"},{id:"demo",name:"自由罷免示範區"},{id:"join",name:"加入公民 v 與物資支援"},{id:"facebook",name:"Facebook",target:"_blank",href:"https://www.facebook.com/Appendectomy"},{id:"email",name:"Email",target:"_blank",href:"mailto:appy.service@gmail.com"}],a.getActive=function(a){return b.url().substr(1)===a?"active":""},a.getHref=function(a){return a.href?a.href:"#/"+a.id},a.getTarget=function(a){return a.target?a.target:"_self"}}]);var DEFAULT_COUNTY="TPE-4",MAP_DEFAULT_VIEW={"TPE-4":{lat:25.0666313,lng:121.5943403,zoom:13},"TPQ-1":{lat:25.1752044,lng:121.4813232,zoom:12},"TPQ-6":{lat:25.0260396,lng:121.4654445,zoom:14}};angular.module("projectVApp").controller("MapCtrl",["$scope","$routeParams","$http","$q","$filter","$modal","leafletData","voteInfoService",function(a,b,c,d,e,f,g,h){function i(a){var b=[];a.properties.TOWNNAME&&b.push(a.properties.TOWNNAME),a.properties.VILLAGENAM&&b.push(a.properties.VILLAGENAM);var c="#aaaaaa";return c}function j(){setTimeout(function(){$(".county").each(function(a,b){b.classList?b.classList.remove("transparent"):b.getAttribute&&b.getAttribute("class")&&b.setAttribute("class",b.getAttribute("class").replace("transparent",""))})},100)}function k(a){return{fillColor:i(a),weight:2,opacity:1,color:"white",dashArray:"3",fillOpacity:.7,className:"county transparent"}}function l(b){a.geojson?a.leafletData.getGeoJSON().then(function(a){a.addData(b)}):a.geojson={data:b,style:k,resetStyleOnMouseout:!0},j()}function m(a,b){var d="json/votestat/8/"+r+".json";c.get(d).then(function(d){s=d.data,angular.forEach(a["投票狀況"],function(d,e){angular.forEach(d,function(d,f){var g="json/twVillage1982/"+b+"/"+a["選區"][0]+"/"+e+"/"+f+".json";c.get(g).then(function(a){l(a.data)},function(){})})})},function(a){console.log("err",a)})}function n(a,b){var c=b.target;c.setStyle({weight:5,color:"#666",dashArray:"",fillOpacity:.7}),c.bringToFront()}function o(a,b,c){var d=c.target.feature.properties.TOWNNAME,e=c.target.feature.properties.VILLAGENAM;p(d,e)}function p(b,c){a.myscope.showVS={},a.myscope.showVS.townName=b,a.myscope.showVS.villageName=c,a.myscope.showVS.vsArray=[],a.markers={};var d=[],e=0;angular.forEach(s[b],function(f){var g=f.neighborhood.indexOf(c);-1!=g&&(a.myscope.showVS.vsArray.push({name:f.name,id:f.id}),0==d.length&&(e=f.id),d.push({vsid:f.id,townName:b,villageName:c,vspos:d.length,vsobj:{lat:f.location.lat,lng:f.location.lng}}))}),q(d),a.myscope.setVotestatTab(e)}function q(b){var c={};angular.forEach(b,function(a){c[a.vspos]={lat:a.vsobj.lat,lng:a.vsobj.lng,icon:t,myloc:a.townName+"-"+a.villageName,myid:a.vsid}}),angular.extend(a,{markers:c}),a.markerNs={},a.markerNs.click=!1,a.$on("leafletDirectiveMarker.click",function(b,c){var d=c.markerName,e=a.markers[d];a.myscope.setVotestatTab(e.myid)}),a.$on("leafletDirectiveMarker.mouseover",function(b,c){var d=c.markerName,e=a.markers[d];e.icon=u}),a.$on("leafletDirectiveMarker.mouseout",function(b,c){a.markerNs.click=!1,a.markers[c.markerName].icon=t})}a.myscope={};var r=b.county,s=null;a.myscope.showVS=null,a.myscope.currentVsTab={},a.myscope.currentTownTab="",a.myscope.vsInfo={volunteer:0,vlist:[],supplement:0,slist:[]},a.leafletData=g,a.taiwan=MAP_DEFAULT_VIEW[r],a.defaults={zoomControlPosition:"bottomright",minZoom:11};var t={iconUrl:"http://fakeimg.pl/20x50/00dd00/?text=X",iconAnchor:[10,50]},u={iconUrl:"http://fakeimg.pl/20x50/dddd00/?text=X",iconAnchor:[10,50]};r in MAP_DEFAULT_VIEW||(r=DEFAULT_COUNTY),a.myscope.areaSelect=function(a,b){p(a,b)},a.myscope.setTownTab=function(b){a.myscope.currentTownTab=b},a.myscope.isCurrentTownTab=function(b){return a.myscope.currentTownTab==b?"bg-primary":""},a.myscope.isCurrentVsTab=function(b){return a.myscope.currentVsTab.vsId==b?"bg-primary":""},a.myscope.setVotestatTab=function(b){a.myscope.currentVsTab.vsId=b,a.myscope.currentVsTab.vsName=function(){for(var c=0;c<a.myscope.showVS.vsArray.length;c++){var d=a.myscope.showVS.vsArray[c];if(d.id==b)return d.name}}();var d="json/votestatInfo/"+r+".json";c.get(d).then(function(c){a.myscope.vsInfo=c.data[b]},function(a){console.log("err",a)})},a.debug=function(){},a.myscope.back=function(){a.myscope.showVS=null,a.markers={}},h.getAllVoteInfo(r).then(function(){},function(){},function(b){a.voteInfos||(a.voteInfos={}),a.voteInfos[b.id]=b.content;var d="json/twVote1982/"+b.id+".json";c.get(d).then(function(c){a.districts?a.districts.features.push(c.data.features[0]):a.districts=c.data;var d=b.id;m(a.voteInfos[d],d)})}),h.getAllVillageSum(r).then(function(){},function(){},function(b){a.myscope.villageSum=b.content,a.myscope.currentTownTab=Object.keys(b.content)[0]}),a.$on("leafletDirectiveMap.geojsonMouseover",n),a.$on("leafletDirectiveMap.geojsonClick",o),a.myscope.registerDialog=function(b){var c=f.open({templateUrl:"views/register.html",controller:"registerDialogController",size:"md",resolve:{data:function(){return{type:b,vsId:a.myscope.currentVsTab.vsId,vsName:a.myscope.currentVsTab.vsName}}}});c.result.then(function(a){console.log("send",a)})}}]).controller("registerDialogController",["$scope","$modalInstance","data",function(a,b,c){a.title="title",a.type=c.type,a.errors="",a.content={type:c.type,votestat:c.vsName,vsid:c.vsId,name:"",phone:"",email:"",supplement:{}};var d={chair1:"椅子#1",chair2:"椅子#2",desk:"桌子",umbrella:"大傘",pens:"筆（若干）",board:"連署板"},e={name:"名字",phone:"手機",email:"E-Mail"},f=function(){var b=a.content.supplement;for(var c in d)if(b[c])return!0;return b.others_select&&b.others&&b.others.length>0?!0:!1};a.send=function(){var c=[];if(a.content.register.$invalid){var d=a.content.register;for(var g in e)d[g].$error.required&&c.push("請填寫您的"+e[g]),d[g].$error.email&&c.push("您的"+e[g]+"格式不符")}"supplement"!=a.content.type||f()||c.push("請勾選您要提供的物資"),0==c.length?b.close(a.content):(console.log("errors",c),a.errors=c.join("，"))},a.cancel=function(){b.dismiss("cancel")}}]),angular.module("projectVApp").service("voteInfoService",["$q","$http",function(a,b){var c={};this.voteInfos=c;var d=null;this.villageSum=d,this.getAllVoteInfo=function(d){function e(a){f.notify({id:a,content:c[a]})}var f=a.defer();return c[d]?e(d):b.get("json/mly/8/"+d+".json").then(function(a){c[d]=a.data,e(d)}),f.promise},this.getAllVillageSum=function(c){function e(a){f.notify({id:a,content:d})}var f=a.defer();return d?e(c):b.get("json/villageSum/"+c+".json").then(function(a){d=a.data,e(c)}),f.promise}}]),angular.module("projectVApp").controller("MissionCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);