webpackJsonp([1],{"1+0r":function(e,t,a){"use strict";var r=a("TGaW"),s=a.n(r),i=a("5L39"),n=a("VU/8")(s.a,i.a,!1,null,null,null);t.default=n.exports},"5L39":function(e,t,a){"use strict";var r={render:function(){var e=this.$createElement;return(this._self._c||e)("div",[this._v("Crewpit Placeholder")])},staticRenderFns:[]};t.a=r},"7Otq":function(e,t,a){e.exports=a.p+"static/img/logo.f0feb9d.png"},"7zck":function(e,t){},"8FPq":function(e,t){},"9S6D":function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("7+uW"),s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var i=a("VU/8")({name:"App"},s,!1,function(e){a("tfK6")},null,null).exports,n=a("/ocq"),o=a("Dd8w"),c=a.n(o),l=a("+cKO"),u=a("NYxO"),d=a("bOdI"),m=a.n(d),v={props:["registerMode"],data:function(){return{email:"",password:"",confirmPassword:"",errorMessage:"",teamName:"",roles:["Observer","Pitcrew","Driver"],selectedRole:"Observer"}},validations:{email:{required:l.required,email:l.email},password:{required:l.required,minLen:Object(l.minLength)(6)},confirmPassword:{sameAs:Object(l.sameAs)("password")},teamName:{required:l.required,minLen:Object(l.minLength)(3)}},methods:c()({},Object(u.b)(["register","createRegistryInDatabase","setFirebaseUser","getUserDetailsFromDatabase"]),{cancelRegistration:function(){this.registerMode=!1,this.$emit("cancelRegistration",this.registerMode)},submitRegistration:function(){var e=this,t={email:this.email,password:this.password};this.register(t).then(function(){e.createDatabaseEntry().then(function(){})}).catch(function(t){e.errorMessage=t.message,e.password="",e.confirmPassword=""})},createDatabaseEntry:function(){var e,t=this,a=(e={teamName:this.teamName,email:this.email},m()(e,"teamName",this.teamName),m()(e,"role",this.selectedRole),m()(e,"teamManager",!0),e);this.createRegistryInDatabase(a).then(function(){return t.setFirebaseUser(),t.getUserDetailsFromDatabase(),t.email="",t.password="",t.teamName="",t.$router.push({name:"Dashboard"}),!0}).catch(function(e){t.errorMessage=e.message})}})},p={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("v-container",{attrs:{"grid-list-md":"","text-center":""}},[r("v-layout",{attrs:{"justify-center":"",row:""}},[r("v-layout",{attrs:{"align-center":"",column:"","fill-height":"",wrap:""}},[r("v-card",{staticClass:"v-card-profile text-center",staticStyle:{"border-radius":"2vh"}},[r("v-avatar",{staticClass:"mx-auto d-block",attrs:{size:"100"}},[r("img",{attrs:{src:a("7Otq")}})]),e._v(" "),r("v-card-text",{staticClass:"text-xs-center"},[r("h3",{staticClass:"card-title font-weight-light"},[e._v("Register Your Team")]),e._v(" "),""!=e.errorMessage?r("v-alert",{attrs:{type:"error"}},[e._v(e._s(e.errorMessage))]):e._e(),e._v(" "),r("v-divider")],1),e._v(" "),r("v-container",{attrs:{"grid-list-md":"","text-center":""}},[r("v-layout",{attrs:{wrap:""}},[r("v-flex",{attrs:{xs6:""}},[r("v-card",{staticClass:"v-card-profile text-center"},[r("v-card-text",{staticClass:"text-xs-center"},[r("h3",{staticClass:"card-title font-weight-light"},[e._v("Personal Details")]),e._v(" "),r("h4",[e._v("\n                      Email\n                      "),r("div",{staticClass:"input",class:{invalid:e.$v.email.$error}},[!e.$v.email.email&&e.$v.email.required&&e.$v.email.$dirty?r("p",[e._v("Please provide a valid email address.")]):e._e(),e._v(" "),!e.$v.email.required&&e.$v.email.email&&e.$v.email.$dirty?r("p",[e._v("This field must not be empty.")]):e._e(),e._v(" "),r("v-text-field",{attrs:{outlined:!0,rounded:!0,clearable:!0},on:{blur:function(t){return e.$v.email.$touch()}},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),e._v("Password\n                      "),r("div",{staticClass:"input",class:{invalid:e.$v.password.$error}},[!e.$v.password.required&&e.$v.password.$dirty?r("p",[e._v("Please provide a password.")]):e._e(),e._v(" "),!e.$v.password.minLen&&e.$v.password.$dirty?r("p",[e._v("Please provide a password at least 6 characters long.")]):e._e(),e._v(" "),r("v-text-field",{attrs:{outlined:!0,rounded:!0,clearable:!0,type:"password"},on:{blur:function(t){return e.$v.password.$touch()}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),e._v("Confirm Password\n                      "),r("div",{staticClass:"input",class:{invalid:e.$v.confirmPassword.$error}},[!e.$v.confirmPassword.sameAs&&e.$v.confirmPassword.$dirty&&e.$v.confirmPassword.$anyError?r("p",[e._v("Passwords do not match.")]):e._e(),e._v(" "),r("v-text-field",{attrs:{outlined:!0,rounded:!0,clearable:!0,type:"password"},on:{blur:function(t){return e.$v.confirmPassword.$touch()}},model:{value:e.confirmPassword,callback:function(t){e.confirmPassword=t},expression:"confirmPassword"}})],1)])])],1)],1),e._v(" "),r("v-flex",{attrs:{xs6:""}},[r("v-card",{staticClass:"v-card-profile text-center"},[r("v-card-text",{staticClass:"text-xs-center"},[r("h3",{staticClass:"card-title font-weight-light"},[e._v("Team Details")]),e._v(" "),r("h4",[e._v("\n                      Team Name\n                      "),r("div",{staticClass:"input",class:{invalid:e.$v.teamName.$error}},[!e.$v.teamName.required&&e.$v.teamName.$dirty?r("p",[e._v("Please provide a name.")]):e._e(),e._v(" "),!e.$v.teamName.minLen&&e.$v.teamName.$dirty?r("p",[e._v("Please provide a name at least 3 characters long.")]):e._e(),e._v(" "),r("v-text-field",{attrs:{outlined:!0,rounded:!0,clearable:!0},on:{blur:function(t){return e.$v.teamName.$touch()}},model:{value:e.teamName,callback:function(t){e.teamName=t},expression:"teamName"}}),e._v("Role in Team\n                        "),r("v-overflow-btn",{attrs:{items:e.roles},model:{value:e.selectedRole,callback:function(t){e.selectedRole=t},expression:"selectedRole"}})],1)])])],1)],1)],1)],1),e._v(" "),r("v-divider"),e._v(" "),r("v-btn",{staticClass:"font-weight-light",staticStyle:{"border-radius":"2vh"},attrs:{color:"success",rounded:"","x-large":"",disabled:e.$v.$invalid},on:{click:e.submitRegistration}},[e._v("Register My Team")]),e._v(" "),r("h5",[r("a",{on:{click:e.cancelRegistration}},[r("u",[e._v("Back to Login")])])])],1)],1)],1)],1)],1)},staticRenderFns:[]};var f=a("VU/8")(v,p,!1,function(e){a("bFOZ")},"data-v-7533c4b8",null).exports,h={data:function(){return{registerMode:!1,email:"",password:"",errorMessage:""}},validations:{email:{required:l.required,email:l.email},password:{required:l.required,minLen:Object(l.minLength)(6)}},components:{appRegister:f},created:function(){var e=this,t=localStorage.getItem("token"),a=localStorage.getItem("firebaseUser");t&&a&&(this.setFirebaseUser(),this.getUserDetailsFromDatabase(),this.tryAutoLogin(t).then(function(){e.$router.push({name:"Dashboard"})}))},methods:c()({},Object(u.b)(["login","tryAutoLogin","setFirebaseUser","getUserDetailsFromDatabase"]),{loginLocal:function(){var e=this,t={email:this.email,password:this.password};this.login(t).then(function(){e.setFirebaseUser(),e.getUserDetailsFromDatabase(),e.email="",e.password="",e.$router.push({name:"Dashboard"})}).catch(function(t){e.errorMessage=t.message,e.password=""})}})},g={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[e.registerMode?e._e():r("v-container",{attrs:{fluid:""}},[r("v-form",[r("v-layout",{attrs:{"justify-center":"",row:""}},[r("v-layout",{attrs:{"align-center":"",column:"","fill-height":""}},[r("v-flex",{attrs:{xs12:""}},[r("v-card",{staticClass:"v-card-profile text-center",staticStyle:{width:"50vh","border-radius":"2vh"}},[r("v-avatar",{staticClass:"mx-auto d-block",attrs:{size:"100"}},[r("img",{attrs:{src:a("7Otq")}})]),e._v(" "),r("v-card-text",{staticClass:"text-xs-center"},[r("h3",{staticClass:"card-title font-weight-light"},[e._v("Enter Your TeamSpace")]),e._v(" "),""!=e.errorMessage?r("v-alert",{attrs:{type:"error"}},[e._v(e._s(e.errorMessage))]):e._e(),e._v(" "),r("h4",[e._v("\n                  Email\n                  "),r("div",{staticClass:"input",class:{invalid:e.$v.email.$error}},[!e.$v.email.email&&e.$v.email.required&&e.$v.email.$dirty?r("p",[e._v("Please provide a valid email address.")]):e._e(),e._v(" "),!e.$v.email.required&&e.$v.email.email&&e.$v.email.$dirty?r("p",[e._v("This field must not be empty.")]):e._e(),e._v(" "),r("v-text-field",{attrs:{outlined:!0,rounded:!0,clearable:!0},on:{blur:function(t){return e.$v.email.$touch()}},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),e._v("Password\n                  "),r("div",{staticClass:"input",class:{invalid:e.$v.password.$error}},[!e.$v.password.required&&e.$v.password.$dirty?r("p",[e._v("Please provide a password.")]):e._e(),e._v(" "),!e.$v.password.minLen&&e.$v.password.$dirty?r("p",[e._v("Please provide a password at least 6 characters long.")]):e._e(),e._v(" "),r("v-text-field",{attrs:{outlined:!0,rounded:!0,clearable:!0,type:"password"},on:{blur:function(t){return e.$v.password.$touch()}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1)]),e._v(" "),r("v-btn",{staticClass:"font-weight-light",staticStyle:{"border-radius":"2vh"},attrs:{color:"success",rounded:"","x-large":"",disabled:e.$v.$invalid},on:{click:e.loginLocal}},[e._v("Log In")]),e._v(" "),r("h5",[r("a",{on:{click:function(t){e.registerMode=!0}}},[e._v("Register a new Team")])]),e._v(" "),r("h5",[r("a",[e._v("Forgot your password?")])])],1)],1)],1)],1)],1)],1)],1),e._v(" "),e.registerMode?r("app-Register",{attrs:{registerMode:e.registerMode},on:{cancelRegistration:function(t){e.registerMode=t}}}):e._e()],1)},staticRenderFns:[]};var b=a("VU/8")(h,g,!1,function(e){a("8FPq")},"data-v-45f0b151",null).exports,_={props:["currentView"],data:function(){return{}},computed:{databaseUser:function(){return this.$store.getters.currentDatabaseUser}},methods:c()({},Object(u.b)(["logout"]),{changeView:function(e){this.currentView=e,this.$emit("changeView",this.currentView)},logoutLocal:function(){this.$router.push({name:"Login"}),this.logout()}})},w={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-toolbar",{staticStyle:{background:"#ffc300"},attrs:{id:"core-toolbar",absolute:"",tile:""}},[a("div",{staticClass:"v-toolbar-title"},[e.databaseUser.hasTeam?a("v-toolbar-items",[a("v-flex",{attrs:{"align-center":"",layout:"","py-2":""}},[a("v-btn",{attrs:{icon:""}},[a("v-icon",{attrs:{color:"tertiary"},on:{click:function(t){return e.changeView("TeamSpace")}}},[e._v("mdi-view-dashboard")])],1),e._v(" "),a("v-btn",{attrs:{icon:""}},[a("v-icon",{attrs:{color:"tertiary"},on:{click:function(t){return e.changeView("StartRun")}}},[e._v("mdi-road-variant")])],1),e._v(" "),a("v-btn",{attrs:{icon:""}},[a("v-icon",{attrs:{color:"tertiary"},on:{click:function(t){return e.changeView("WatchRun")}}},[e._v("mdi-file-word-box")])],1),e._v(" "),a("v-btn",{attrs:{icon:""}},[a("v-icon",{attrs:{color:"tertiary"},on:{click:function(t){return e.changeView("DriverSetup")}}},[e._v("mdi-car")])],1),e._v(" "),a("v-btn",{attrs:{icon:""}},[a("v-icon",{attrs:{color:"tertiary"},on:{click:function(t){return e.changeView("CrewpitSetup")}}},[e._v("mdi-cards")])],1),e._v(" "),a("v-btn",{attrs:{icon:""}},[a("v-icon",{attrs:{color:"tertiary"},on:{click:function(t){return e.changeView("TeamManagement")}}},[e._v("mdi-account-multiple")])],1),e._v(" "),a("v-btn",{on:{click:function(t){return e.logoutLocal()}}},[e._v("Logout")])],1)],1):e._e()],1)])},staticRenderFns:[]},y=a("VU/8")(_,w,!1,null,null,null).exports,$={data:function(){return{}},computed:{firebaseUser:function(){return this.$store.getters.currentFirebaseUser},databaseUser:function(){return this.$store.getters.currentDatabaseUser},listOfMembers:function(){return this.$store.getters.currentMembersDetails.membersDetails}},methods:c()({},Object(u.b)(["deleteUser"]),{deleteUserLocal:function(){var e={userKey:this.databaseUser.userKey};this.deleteUser(e),this.$router.push({name:"Login"})}})},x={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[e.databaseUser.hasTeam?a("div",[e._v("\n    TeamSpace Placeholder\n    "),a("div",[e._v("firebaseUser: "+e._s(e.firebaseUser))]),e._v(" "),a("div",[e._v("databaseUser: "+e._s(e.databaseUser))]),e._v(" "),a("br"),e._v(" "),a("ul",e._l(e.listOfMembers,function(t,r,s){return a("li",{key:s},[e._v(e._s(t))])}),0)]):e._e(),e._v(" "),!e.databaseUser.hasTeam&&e.databaseUser?a("div",[a("v-container",{attrs:{"grid-list-md":"","text-center":""}},[a("v-layout",{attrs:{"justify-center":"",row:""}},[a("v-layout",{attrs:{"align-center":"",column:"","fill-height":"",wrap:""}},[a("v-card",{staticClass:"v-card-profile text-center",staticStyle:{"border-radius":"2vh"}},[a("v-card-text",{staticClass:"text-xs-center"},[a("h3",{staticClass:"card-title font-weight-light"},[e._v("Sorry to Interrupt but..")]),e._v(" "),a("v-divider"),e._v(" "),a("v-card",{staticClass:"v-card-profile text-center",staticStyle:{width:"100vh"}},[a("v-card-text",{staticClass:"text-xs-center"},[a("h3",{staticClass:"card-title font-weight-light"},[e._v("You currently do not have a team.")]),e._v(" "),a("v-divider"),e._v(" "),a("h4",{staticClass:"card-title font-weight-light"},[e._v("Please click the button below to reset your account so you may register a new team or accept invites from another team.")]),e._v(" "),a("v-btn",{staticClass:"font-weight-light",staticStyle:{"border-radius":"2vh"},attrs:{color:"success",rounded:"","x-large":""},on:{click:e.deleteUserLocal}},[e._v("Reset Account")])],1)],1)],1)],1)],1)],1)],1)],1):e._e()])},staticRenderFns:[]},k=a("VU/8")($,x,!1,null,null,null).exports,U={data:function(){return{connection:new RTCMultiConnection,status:!1,video:!1}},created:function(){},computed:{databaseUser:function(){return this.$store.getters.currentDatabaseUser}},methods:{openOrJoinRoom:function(){var e=this;this.connection.socketURL="https://rtcmulticonnection.herokuapp.com:443/",this.connection.session={audio:!0,video:!0},this.connection.sdpConstraints.mandatory={OfferToReceiveAudio:!0,OfferToReceiveVideo:!0};var t=document.getElementById("selfVideo"),a=document.getElementById("remoteVideo");this.connection.onstream=function(r){var s=r.mediaElement;e.connection.applyConstraints({video:{width:400,height:400}}),e.video=s,"local"===r.type&&t.appendChild(s),"remote"===r.type&&a.appendChild(s)},this.connection.openOrJoin("semicircleroom")}}},S={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("div",[e._v("Device Status: "+e._s(e.status))]),e._v(" "),a("hr"),e._v(" "),a("div",[e._v("Connection: "+e._s(e.connection))]),e._v(" "),a("hr"),e._v(" "),a("div",[e._v("Video: "+e._s(e.video)+" ")]),e._v(" "),a("v-btn",{on:{click:e.openOrJoinRoom}},[e._v("Open or Join Room")]),e._v(" "),a("div",{attrs:{id:"selfVideo"}}),e._v(" "),a("div",{attrs:{id:"remoteVideo"}})],1)},staticRenderFns:[]};var C=a("VU/8")(U,S,!1,function(e){a("rg+Y")},"data-v-7decfe02",null).exports,D=a("qXuH"),P=a("dKbn"),M=a("1+0r"),R={data:function(){return{email:"",sending:!1,randomPassword:null}},computed:{databaseUser:function(){return this.$store.getters.currentDatabaseUser},listOfMembers:function(){return this.$store.getters.currentMembersDetails.membersDetails}},validations:{email:{required:l.required,email:l.email}},mounted:function(){this.$nextTick(function(){var e=document.createElement("script");e.setAttribute("src","https://cdn.jsdelivr.net/npm/emailjs-com@2.3.2/dist/email.min.js"),document.head.appendChild(e)})},methods:c()({},Object(u.b)(["addMemberInDatabase","createMemberInAuth","getMembersFromDatabase","setManager","setRole","removeMember"]),{setManagerLocal:function(e,t){var a={userKey:e,value:t};this.setManager(a)},setRoleLocal:function(e,t){var a={userKey:e,value:t};this.setRole(a)},removeMemberLocal:function(e,t){var a={userKey:e,teamKey:t};this.removeMember(a)},sendInvite:function(){this.sending=!0,this.sendRequestToAddMember()},sendRequestToAddMember:function(){var e=this;this.randomPassword=String(Math.floor(1e7+9e5*Math.random()));var t={email:this.email,password:this.randomPassword};this.createMemberInAuth(t).then(function(){var t={teamKey:e.$store.getters.currentDatabaseUser.teamKey,email:e.email};e.addMemberInDatabase(t).then(function(){e.sendEmail(e.email)})})},sendEmail:function(e){var t=this;event.preventDefault(),emailjs.init("user_NjsqTvqcSj3KgQY5BlS8S");var a=this.email+"-;-"+this.randomPassword;emailjs.send("gmail","semicircle_invitation",{to_email:this.email,link_html:'<a href="http://localhost:8080/#/Invited/'+a+'">Set up your account</a>'}).then(function(e){t.sending=!1},function(e){t.sending=!1})}})},T={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-container",{attrs:{"grid-list-md":"","text-center":""}},[a("v-layout",{attrs:{"justify-center":"",row:""}},[a("v-layout",{attrs:{"align-center":"",column:"","fill-height":"",wrap:""}},[a("v-card",{staticClass:"v-card-profile text-center",staticStyle:{"border-radius":"2vh"}},[a("v-card-text",{staticClass:"text-xs-center"},[a("h3",{staticClass:"card-title font-weight-light"},[e._v("Team Management")]),e._v(" "),a("v-divider"),e._v(" "),a("v-card",{staticClass:"v-card-profile text-center",staticStyle:{width:"100vh"}},[a("v-card-text",{staticClass:"text-xs-center"},[a("h3",{staticClass:"card-title font-weight-light"},[e._v("Current Members")]),e._v(" "),e._l(e.listOfMembers,function(t,r,s){return a("v-list",{key:s},[t.userKey!=e.databaseUser.userKey?a("v-list-group",{scopedSlots:e._u([{key:"activator",fn:function(){return[a("v-list-item-title",[e._v("\n                        "+e._s(t.email)+" ("+e._s(t.role)+")\n                        "),t.teamManager?a("manager",[e._v("*")]):e._e()],1)]},proxy:!0}],null,!0)},[e._v(" "),e.databaseUser.teamManager?a("v-list-group",{attrs:{"no-action":"","sub-group":"",value:"true"},scopedSlots:e._u([{key:"activator",fn:function(){return[a("v-list-item-content",[a("v-list-item-title",[e._v("Manager Actions")])],1)]},proxy:!0}],null,!0)},[e._v(" "),t.teamManager?e._e():a("v-list-item",{attrs:{link:""},on:{click:function(a){return e.setManagerLocal(t.userKey,!0,s)}}},[a("v-list-item-title",[e._v("Promote as Team Manager")]),e._v(" "),a("v-list-item-icon",[a("v-icon",[e._v("mdi-account-plus")])],1)],1),e._v(" "),t.teamManager?a("v-list-item",{attrs:{link:""},on:{click:function(a){return e.setManagerLocal(t.userKey,!1,s)}}},[a("v-list-item-title",[e._v("Remove as Team Manager")]),e._v(" "),a("v-list-item-icon",[a("v-icon",[e._v("mdi-account-minus")])],1)],1):e._e(),e._v(" "),a("v-list-item",{attrs:{link:""},on:{click:function(a){return e.removeMemberLocal(t.userKey,t.teamKey)}}},[a("v-list-item-title",[e._v("Remove From Team")]),e._v(" "),a("v-list-item-icon",[a("v-icon",[e._v("mdi-account-remove")])],1)],1)],1):e._e(),e._v(" "),a("v-list-group",{attrs:{"sub-group":"","no-action":""},scopedSlots:e._u([{key:"activator",fn:function(){return[a("v-list-item-content",[a("v-list-item-title",[e._v("Assign Role")])],1)]},proxy:!0}],null,!0)},[e._v(" "),"Observer"!=t.role?a("v-list-item",{attrs:{link:""},on:{click:function(a){return e.setRoleLocal(t.userKey,"Observer")}}},[a("v-list-item-title",[e._v("Set as Observer")]),e._v(" "),a("v-list-item-icon",[a("v-icon",[e._v("mdi-eye")])],1)],1):e._e(),e._v(" "),"Pitcrew"!=t.role?a("v-list-item",{attrs:{link:""},on:{click:function(a){return e.setRoleLocal(t.userKey,"Pitcrew")}}},[a("v-list-item-title",[e._v("Set as Pitcrew")]),e._v(" "),a("v-list-item-icon",[a("v-icon",[e._v("mdi-cards")])],1)],1):e._e(),e._v(" "),"Driver"!=t.role?a("v-list-item",{attrs:{link:""},on:{click:function(a){return e.setRoleLocal(t.userKey,"Driver")}}},[a("v-list-item-title",[e._v("Set as Driver")]),e._v(" "),a("v-list-item-icon",[a("v-icon",[e._v("mdi-car")])],1)],1):e._e()],1)],1):e._e()],1)}),e._v(" "),a("v-divider"),e._v(" "),a("h3",{staticClass:"card-title font-weight-light"},[e._v("Send An Invite via Email")]),e._v(" "),a("div",{staticClass:"input",class:{invalid:e.$v.email.$error}},[!e.$v.email.email&&e.$v.email.required&&e.$v.email.$dirty?a("p",[e._v("Please provide a valid email address.")]):e._e()]),e._v(" "),a("v-text-field",{attrs:{outlined:!0,rounded:!0,clearable:!0},on:{blur:function(t){return e.$v.email.$touch()}},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),e._v(" "),a("v-btn",{staticClass:"font-weight-light",staticStyle:{"border-radius":"2vh"},attrs:{color:"success",rounded:"","x-large":"",disabled:e.$v.$invalid||e.sending},on:{click:e.sendInvite}},[e._v("Send Invitation")])],2)],1)],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var I=a("VU/8")(R,T,!1,function(e){a("9S6D")},"data-v-eab1227a",null).exports,K={data:function(){return{currentView:"TeamSpace",loading:!0}},computed:{monitorFirebaseChange:function(){return this.$store.getters.currentFirebaseUser},monitorDatabaseChange:function(){return this.$store.getters.currentDatabaseUser}},watch:{monitorFirebaseChange:function(){this.getUserDetailsFromDatabase()},monitorDatabaseChange:function(){if(this.$store.getters.currentDatabaseUser.hasTeam){var e={teamKey:this.$store.getters.currentDatabaseUser.teamKey,userKey:this.$store.getters.currentDatabaseUser.userKey};this.getMembersFromDatabase(e),this.loading=!1}}},methods:c()({},Object(u.b)(["getUserDetailsFromDatabase","getMembersFromDatabase"])),components:{appToolbar:y,appTeamSpace:k,appStartRun:C,appWatchRun:D.default,appDriverSetup:P.default,appCrewpitSetup:M.default,appTeamManagement:I}},L={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("app-toolbar",{attrs:{currentView:e.currentView},on:{changeView:function(t){e.currentView=t}}}),e._v(" "),e.loading?e._e():a("div",{staticStyle:{"margin-top":"80px"}},["TeamSpace"==e.currentView?a("app-team-space"):e._e(),e._v(" "),"StartRun"==e.currentView?a("app-start-run"):e._e(),e._v(" "),"WatchRun"==e.currentView?a("app-watch-run"):e._e(),e._v(" "),"DriverSetup"==e.currentView?a("app-driver-setup"):e._e(),e._v(" "),"CrewpitSetup"==e.currentView?a("app-crewpit-setup"):e._e(),e._v(" "),"TeamManagement"==e.currentView?a("app-team-management"):e._e()],1)],1)},staticRenderFns:[]},V=a("VU/8")(K,L,!1,null,null,null).exports,F={data:function(){return{logo:"../../assets/logo.png",currentView:"/TeamSpace",links:[{to:"/TeamSpace",icon:"mdi-view-dashboard",text:"TeamSpace",for:"Public"},{to:"/StartRun",icon:"mdi-flag-checkered",text:"Start a Run",for:"DriverAndCrewpit"},{to:"/WatchRun",icon:"mdi-camcorder",text:"Watch a Run",for:"Public"},{to:"/DriverSetup",icon:"mdi-bike",text:"Driver's Setup",for:"Driver"},{to:"/CrewpitSetup",icon:"mdi-walk",text:"Crewpit Setup",for:"Crewpit"},{to:"/TeamManagement",icon:"mdi-account-multiple",text:"Team",for:"Public"},{to:"/test",icon:"mdi-logout",text:"Log Out",for:"Public"}],responsive:!1}},components:{appTeamSpace:k,appStartRun:C,appWatchRun:D.default},computed:{FilteredLinks:function(){return this.links.filter(function(e){if("Public"==e.for||"Driver"==e.for||"DriverAndCrewpit"==e.for&&"Crewpit"!=e.for)return e})}},methods:{setView:function(e){return this.currentView=e}}},O={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("v-navigation-drawer",{attrs:{id:"app-drawer",app:"",dark:"",floating:"",persistent:"","mobile-break-point":"991",width:"260"},model:{value:e.inputValue,callback:function(t){e.inputValue=t},expression:"inputValue"}},[r("v-img",{attrs:{src:e.logo,gradient:e.sidebarOverlayGradiant,height:"100%"}},[r("v-layout",{staticClass:"fill-height",attrs:{tag:"v-list",column:""}},[r("v-avatar",{staticClass:"mx-auto d-block",attrs:{color:"white",size:"100"}},[r("img",{attrs:{src:a("7Otq")}})]),e._v(" "),r("v-list",{attrs:{rounded:""}},[r("v-list-item-group",{attrs:{color:"primary"},model:{value:e.item,callback:function(t){e.item=t},expression:"item"}},e._l(e.links,function(t,a){return r("v-list-item",{key:a,on:{click:function(a){return e.setView(t.to)}}},[r("v-list-item-icon",[r("v-icon",{domProps:{textContent:e._s(t.icon)}})],1),e._v(" "),r("v-list-item-content",[r("v-list-item-title",{domProps:{textContent:e._s(t.text)}})],1)],1)}),1)],1)],1)],1)],1),e._v(" "),"/TeamSpace"==e.currentView?r("app-TeamSpace"):e._e(),e._v(" "),"/StartRun"==e.currentView?r("app-StartRun"):e._e(),e._v(" "),"/WatchRun"==e.currentView?r("app-WatchRun"):e._e()],1)},staticRenderFns:[]};var q=a("VU/8")(F,O,!1,function(e){a("THY+")},null,null).exports,A={data:function(){return{link:this.$route.params.link,email:null,password:null,newPassword:"",confirmPassword:"",message:null}},created:function(){var e=this.link.split("-;-");this.email=e[0],this.password=e[1]},validations:{newPassword:{required:l.required,minLen:Object(l.minLength)(6)},confirmPassword:{sameAs:Object(l.sameAs)("newPassword")}},methods:c()({},Object(u.b)(["setPassword"]),{SetPasswordLocal:function(){var e=this,t={email:this.email,password:this.password,newPassword:this.newPassword};this.setPassword(t).then(function(){e.message="Your message has been set. You can log in now.",e.$router.push({name:"Login"})})}})},E={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-container",{attrs:{"grid-list-md":"","text-center":""}},[a("v-layout",{attrs:{"justify-center":"",row:""}},[a("v-layout",{attrs:{"align-center":"",column:"","fill-height":"",wrap:""}},[a("v-card",{staticClass:"v-card-profile text-center",staticStyle:{"border-radius":"2vh"}},[a("v-card-text",{staticClass:"text-xs-center"},[a("h3",{staticClass:"card-title font-weight-light"},[e._v("SemiCircle")]),e._v(" "),a("v-divider"),e._v(" "),a("v-card",{staticClass:"v-card-profile text-center",staticStyle:{width:"100vh"}},[a("v-card-text",{staticClass:"text-xs-center"},[a("h3",{staticClass:"card-title font-weight-light"},[a("p",[e._v("Someone has invited you to join their team.")]),e._v("\n                  "+e._s(e.email)+"\n                  "),a("p",[e._v("Please set your password before proceeding.")]),e._v("\n                  Password\n                      "),a("div",{staticClass:"input",class:{invalid:e.$v.newPassword.$error}},[!e.$v.newPassword.required&&e.$v.newPassword.$dirty?a("p",[e._v("Please provide a password.")]):e._e(),e._v(" "),!e.$v.newPassword.minLen&&e.$v.newPassword.$dirty?a("p",[e._v("Please provide a password at least 6 characters long.")]):e._e(),e._v(" "),a("v-text-field",{attrs:{outlined:!0,rounded:!0,clearable:!0,type:"password"},on:{blur:function(t){return e.$v.newPassword.$touch()}},model:{value:e.newPassword,callback:function(t){e.newPassword=t},expression:"newPassword"}})],1),e._v("\n                      Confirm Password\n                      "),a("div",{staticClass:"input",class:{invalid:e.$v.confirmPassword.$error}},[!e.$v.confirmPassword.sameAs&&e.$v.confirmPassword.$dirty&&e.$v.confirmPassword.$anyError?a("p",[e._v("Passwords do not match.")]):e._e(),e._v(" "),a("v-text-field",{attrs:{outlined:!0,rounded:!0,clearable:!0,type:"password"},on:{blur:function(t){return e.$v.confirmPassword.$touch()}},model:{value:e.confirmPassword,callback:function(t){e.confirmPassword=t},expression:"confirmPassword"}})],1),e._v(" "),a("v-btn",{staticClass:"font-weight-light",staticStyle:{"border-radius":"2vh"},attrs:{color:"success",rounded:"","x-large":"",disabled:e.$v.$invalid},on:{click:function(t){return e.SetPasswordLocal()}}},[e._v("Set Password")]),e._v(" "),a("p",[e._v(e._s(e.message))])],1),e._v(" "),a("v-divider"),e._v(" "),a("h4",{staticClass:"card-title font-weight-light"},[e._v("Download our Android apk below to get started.")])],1)],1)],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var N=a("VU/8")(A,E,!1,function(e){a("QIB3")},"data-v-83e23e64",null).exports;r.default.use(n.a);var j=new n.a({routes:[{path:"/",name:"Login",component:b},{path:"/Dashboard",name:"Dashboard",component:V},{path:"/test",name:"test",component:q},{path:"/TeamSpace",name:"TeamSpace",component:k},{path:"/StartRun",name:"StartRun",component:C},{path:"/WatchRun",name:"WatchRun",component:D.default},{path:"/TeamManagement",name:"TeamManagement",component:I},{path:"/DriverSetup",name:"DriverSetup",component:P.default},{path:"/CrewpitSetup",name:"CrewpitSetup",component:M.default},{path:"/Invited/:link",name:"Invited",component:N},{path:"*",redirect:"/"}]}),W=a("3EgV"),Y=a.n(W);a("7zck"),a("csSS");r.default.use(Y.a);var B=new Y.a({icons:{iconfont:"mdi"},theme:{dark:!1}}),z=a("kxiW"),H=a.n(z);H.a.initializeApp({apiKey:"AIzaSyC7-c4Ulslc_tTgwm-s3SYpkmkrI9krcbs",authDomain:"semicircle-b0e4e.firebaseapp.com",databaseURL:"https://semicircle-b0e4e.firebaseio.com",projectId:"semicircle-b0e4e",storageBucket:"",messagingSenderId:"172966864618",appId:"1:172966864618:web:6c05c05158d98deb"});var J=H.a.database(),G=H.a.auth,Z={AUTH_STATUS_CHANGE:function(e){e.isLoggedIn=null!=G().currentUser,e.firebaseUser=G().currentUser,Q.getUserDetailsFromDatabase(),localStorage.setItem("firebaseUser",G().currentUser.uid),G().currentUser.getIdToken(!0).then(function(e){localStorage.setItem("token",e)}).catch(function(e){})},setDatabaseUser:function(e,t){e.databaseUser=t},setMembersDetails:function(e,t){e.membersDetails=t}},Q={tryAutoLogin:function(e,t){return G().signInWithCustomToken(t).catch(function(e){}),Q.getUserDetailsFromDatabase(),!0},setFirebaseUser:function(e){var t=localStorage.getItem("firebaseUser");e.firebaseUser=t},logout:function(e){localStorage.removeItem("token"),localStorage.removeItem("firebaseUser"),e.isLoggedIn=!1,G().signOut()},register:function(e,t){return G().createUserWithEmailAndPassword(t.email,t.password)},login:function(e,t){return G().signInWithEmailAndPassword(t.email,t.password)},getUserDetailsFromDatabase:function(e){var t=e.commit,a=G().currentUser.email,r=[];J.ref("users").orderByChild("email").equalTo(a).on("value",function(e){e.forEach(function(e){var t=e.val();t.key=e.key,(r=[]).push(t)});var a={userKey:r[0].userKey,teamKey:r[0].teamKey,teamName:r[0].teamName,teamManager:r[0].teamManager,role:r[0].role,hasTeam:r[0].hasTeam};return t("setDatabaseUser",a),a})},createRegistryInDatabase:function(e,t){var a=J.ref("teams").push(),r=J.ref("users").push(),s=a.key,i=r.key,n={teamKey:s,teamName:t.teamName,members:[i]},o={userKey:i,email:t.email,teamKey:s,teamName:t.teamName,role:t.role,teamManager:t.teamManager,hasTeam:!0};return a.set(n),r.set(o),!0},createMemberInAuth:function(e,t){var a=t.email+t.password,r=H.a.initializeApp({apiKey:"AIzaSyC7-c4Ulslc_tTgwm-s3SYpkmkrI9krcbs",authDomain:"semicircle-b0e4e.firebaseapp.com",databaseURL:"https://semicircle-b0e4e.firebaseio.com",projectId:"semicircle-b0e4e",storageBucket:"",messagingSenderId:"172966864618",appId:"1:172966864618:web:6c05c05158d98deb"},a);r.auth().createUserWithEmailAndPassword(t.email,t.password).then(function(){return r.auth().signOut(),r.delete(),!0}).catch(function(e){return console.log(e.message),r.auth().signOut(),r.delete(),!1})},getMembersFromDatabase:function(e,t){var a=e.commit,r=t.teamKey,s=t.userKey,i=[],n=[],o=[];J.ref("teams").orderByChild("teamKey").equalTo(r).on("value",function(e){return e.forEach(function(e){var t=e.val();t.key=e.key,i.push(t)}),{teamName:i[0].teamName,teamMembers:i[0].members}.teamMembers.forEach(function(e){J.ref("users").orderByChild("userKey").equalTo(e).on("value",function(e){e.forEach(function(e){var t=e.val();if(t.key=e.key,t.key!=s)if(o.includes(t.key)||1!=t.hasTeam){if(o.includes(t.key)&&1==t.hasTeam){var a=n.findIndex(function(e){return e.key===t.key});n.splice(a,1,t)}else if(o.includes(t.key)&&0==t.hasTeam){a=n.findIndex(function(e){return e.key===t.key});n.splice(a,1)}}else n.push(t),o.push(t.key)})})}),a("setMembersDetails",n),n})},addMemberInDatabase:function(e,t){var a=t.teamKey,r=[];J.ref("teams").orderByChild("teamKey").equalTo(a).on("value",function(e){e.forEach(function(e){var t=e.val();t.key=e.key,r.push(t)})});var s=r[0].teamName,i=r[0].members,n=J.ref("users").push(),o=n.key,c={userKey:o,email:t.email,teamKey:a,teamName:s,role:"Observer",teamManager:!1,hasTeam:!0};return n.set(c),i.push(o),J.ref("teams/"+a+"/members").set(i),!0},setPassword:function(e,t){var a=H.a.initializeApp({apiKey:"AIzaSyC7-c4Ulslc_tTgwm-s3SYpkmkrI9krcbs",authDomain:"semicircle-b0e4e.firebaseapp.com",databaseURL:"https://semicircle-b0e4e.firebaseio.com",projectId:"semicircle-b0e4e",storageBucket:"",messagingSenderId:"172966864618",appId:"1:172966864618:web:6c05c05158d98deb"},"Secondary");a.auth().signInWithEmailAndPassword(t.email,t.password).then(function(){return a.auth().currentUser.updatePassword(t.newPassword),a.auth().signOut(),a.delete(),!0})},setManager:function(e,t){J.ref("users/"+t.userKey+"/teamManager").set(t.value)},setRole:function(e,t){J.ref("users/"+t.userKey+"/role").set(t.value)},removeMember:function(e,t){J.ref("users/"+t.userKey+"/hasTeam").set(!1);var a=t.teamKey,r=[];J.ref("teams").orderByChild("teamKey").equalTo(a).on("value",function(e){e.forEach(function(e){var t=e.val();t.key=e.key,r.push(t)})});var s=r[0].members,i=s.indexOf(t.userKey);return s.splice(i,1),J.ref("teams/"+a+"/members").set(s),!0},deleteUser:function(e,t){J.ref("users/"+t.userKey).remove().then(function(){G().currentUser.delete().then(function(){return!0})})}},X={state:{isLoggedIn:null!=G().currentUser,firebaseUser:G().currentUser,databaseUser:null,membersDetails:null},mutations:Z,actions:Q,getters:{isLoggedIn:function(e){return e.isLoggedIn},currentFirebaseUser:function(e){return e&&e.firebaseUser?{email:e.firebaseUser.email,uid:e.firebaseUser.uid}:"Fetching Data from Firebase"},currentDatabaseUser:function(e){return e&&e.databaseUser?{userKey:e.databaseUser.userKey,teamKey:e.databaseUser.teamKey,teamName:e.databaseUser.teamName,teamManager:e.databaseUser.teamManager,role:e.databaseUser.role,hasTeam:e.databaseUser.hasTeam}:"Fetching Data from Firebase"},currentMembersDetails:function(e){return e&&e.membersDetails?{membersDetails:e.membersDetails}:"Fetching Data from Firebase"}}};r.default.use(u.a);var ee,te=new u.a.Store({modules:{auth:X}}),ae=(a("j1ja"),a("ESwS")),re=a.n(ae);r.default.use(j),r.default.use(re.a),ee=function(e,t){te&&te.commit("AUTH_STATUS_CHANGE")},H.a.auth().onAuthStateChanged(function(e){e?ee(!0,e):ee(!1)},function(e){console.log(e)}),r.default.config.productionTip=!1,new r.default({el:"#app",router:j,vuetify:B,store:te,components:{App:i},template:"<App/>"})},Od5z:function(e,t){},QIB3:function(e,t){},TGaW:function(e,t){},"THY+":function(e,t){},Wi9Z:function(e,t,a){"use strict";var r={render:function(){var e=this.$createElement;return(this._self._c||e)("div",[this._v("WatchRun Placeholder")])},staticRenderFns:[]};t.a=r},bFOZ:function(e,t){},csSS:function(e,t){},dKbn:function(e,t,a){"use strict";var r=a("oYuJ"),s=a.n(r),i=a("qigx"),n=a("VU/8")(s.a,i.a,!1,null,null,null);t.default=n.exports},oYuJ:function(e,t){},qXuH:function(e,t,a){"use strict";var r=a("Od5z"),s=a.n(r),i=a("Wi9Z"),n=a("VU/8")(s.a,i.a,!1,null,null,null);t.default=n.exports},qigx:function(e,t,a){"use strict";var r={render:function(){var e=this.$createElement;return(this._self._c||e)("div",[this._v("DriverSetup Placeholder")])},staticRenderFns:[]};t.a=r},"rg+Y":function(e,t){},tfK6:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.c140ebb15c50473fb172.js.map