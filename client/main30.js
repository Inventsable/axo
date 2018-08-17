var csInterface = new CSInterface();
var appSkin = csInterface.hostEnvironment.appSkinInfo;
var sysPath = csInterface.getSystemPath(SystemPath.EXTENSION);
var logPath = sysPath + "/log/";
var hostPath = sysPath + "/host/";
var appName = csInterface.hostEnvironment.appName;

loadUniversalJSXLibraries();
loadJSX('axo30.jsx');

// Event handler
window.Event = new Vue();

// Constant source of truth
var trueAngle = 30;

// Vue.component('gamepad', {
//   template: `
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
//     <title>axoMenu</title>
//     <g v-for="item in section" :id="item.direction" class="grow" @mouseover="highlightThis(item)" @mouseleave="normalizeAll">
//       <g @mouseover="$emit('newAnno', item.anno1)" @click="SSRcw(item.direction)">
//         <path :class="item.direction + 'Bounds'" :d="item.cwBounds"/>
//         <path :class="item.direction + 'Arrow'" :d="item.cwArrow"/>
//       </g>
//       <g @mouseover="$emit('newAnno', item.anno2)" @click="SSRacw(item.direction)">
//         <path :class="item.direction + 'Bounds'" :d="item.acwBounds"/>
//         <path :class="item.direction + 'Arrow'" :d="item.acwArrow"/>
//       </g>
//       <line v-if="(item.direction == 'Top')" :class="item.direction + 'Divider'" x1="95.9" y1="12.46" x2="95.9" y2="60.33"/>
//       <line v-if="(item.direction == 'Left')" :class="item.direction + 'Divider'" x1="41.51" y1="106.69" x2="82.97" y2="82.75"/>
//       <line v-if="(item.direction == 'Right')" :class="item.direction + 'Divider'" x1="150.31" y1="106.68" x2="108.85" y2="82.74"/>
//     </g>
//     <g id="center" @mouseover="minimizeAll" @mouseleave="normalizeAll">
//       <path data-name="center" class="center" d="M95.91,56.16A19.12,19.12,0,1,1,76.8,75.27,19.12,19.12,0,0,1,95.91,56.16"/>
//     </g>
//     <g id="frame">
//       <rect class="rect-bounds" width="200" height="150"/>
//     </g>
//   </svg>
//   `,
//   data() {
//     return {
//       section : [
//         {
//           direction: 'Top',
//           cwBounds: 'M149.4,40.65,99.47,70.22a7,7,0,0,1-3.57,1v-64a7,7,0,0,1,3.57,1L149.4,37.76A1.68,1.68,0,0,1,149.4,40.65Z',
//           cwArrow: 'M111,31.85a1.08,1.08,0,0,0-.92.19,1.06,1.06,0,0,0-.41.84V40a1,1,0,0,0,.42.84,1.05,1.05,0,0,0,.64.22.84.84,0,0,0,.27,0l17.57-4.67Z',
//           acwBounds: 'M95.9,7.21v64a7,7,0,0,1-3.57-1L42.4,40.65a1.68,1.68,0,0,1,0-2.89L92.33,8.19A7,7,0,0,1,95.9,7.21Z',
//           acwArrow: 'M80.84,31.85,63.26,36.39l17.58,4.67a.84.84,0,0,0,.27,0,1.08,1.08,0,0,0,.64-.22,1.06,1.06,0,0,0,.41-.84V32.88a1.06,1.06,0,0,0-1.32-1Z',
//         },
//         {
//           direction: 'Left',
//           cwBounds: 'M39.17,46.26,89.75,74.72a7,7,0,0,1,2.62,2.6L37,109.31a6.91,6.91,0,0,1-.93-3.58l.64-58A1.68,1.68,0,0,1,39.17,46.26Z',
//           cwArrow: 'M45.91,66.45,50.78,84a1,1,0,0,0,.62.69,1.1,1.1,0,0,0,.4.08,1.13,1.13,0,0,0,.53-.14L58.53,81a1,1,0,0,0,.52-.78,1.09,1.09,0,0,0-.3-.89Z',
//           acwBounds: 'M37,109.31l55.41-32a7,7,0,0,1,.95,3.58l-.65,58a1.68,1.68,0,0,1-2.5,1.45L39.6,111.91A6.87,6.87,0,0,1,37,109.31Z',
//           acwArrow: 'M73.82,105.43a1.06,1.06,0,0,0-1.55-.64l-6.21,3.59a1.06,1.06,0,0,0-.22,1.65l12.71,13Z',
//         },
//         {
//           direction: 'Right',
//           cwBounds: 'M99.15,138.92l-.64-58a6.94,6.94,0,0,1,.94-3.58l55.41,32a6.91,6.91,0,0,1-2.63,2.6l-50.58,28.46A1.68,1.68,0,0,1,99.15,138.92Z',
//           cwArrow: 'M125.76,108.37l-6.21-3.58a1,1,0,0,0-.93-.07,1,1,0,0,0-.61.71L113.27,123,126,110a1,1,0,0,0-.22-1.65Z',
//           acwBounds: 'M154.86,109.3l-55.41-32a6.91,6.91,0,0,1,2.63-2.6l50.57-28.46a1.68,1.68,0,0,1,2.5,1.45l.65,58A7,7,0,0,1,154.86,109.3Z',
//           acwArrow: 'M133.07,79.33a1.06,1.06,0,0,0-.3.88,1.1,1.1,0,0,0,.52.78l6.21,3.58a1.07,1.07,0,0,0,.52.14,1.15,1.15,0,0,0,.41-.08,1,1,0,0,0,.61-.69l4.87-17.49Z',
//         },
//       ],
//       angle : trueAngle,
//     }
//   },
//   created() {
//     Event.$on('angShift', function(e) {
//       this.angle = e;
//     })
//   },
//   methods: {
//     SSRcw : function(dir) {
//       trueAngle = (trueAngle > 0) ? trueAngle * -1 : trueAngle;
//       csInterface.evalScript(`SSR('${trueAngle}', '${dir}')`, function(e){
//       })
//     },
//     SSRacw : function(dir) {
//       trueAngle = (trueAngle < 0) ? trueAngle * -1 : trueAngle;
//       csInterface.evalScript(`SSR('${trueAngle}', '${dir}')`, function(e){
//       })
//     },
//     highlightThis: function(section) {
//       this.section.forEach(function(v,i,a){
//         var target = document.getElementById(v.direction);
//         if (v == section) {
//           target.style.opacity = 1;
//         } else {
//           target.style.opacity = .5;
//         }
//       });
//     },
//     minimizeAll: function() {
//       this.section.forEach(function(v,i,a){
//         var target = document.getElementById(v.direction);
//         target.style.transform = 'scale(.375)';
//         target.style.opacity = 1;
//       });
//       changeCSSVar('dimmed', 'rgba(0,0,0,0)');
//     },
//     normalizeAll: function() {
//       this.section.forEach(function(v,i,a){
//         var target = document.getElementById(v.direction);
//         target.style.transform = 'scale(1)';
//         target.style.opacity = .5;
//       });
//       changeCSSVar('dimmed', 'rgba(0,0,0,.225)');
//     },
//   }
// })


Vue.component('axo', {
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
    <g v-for="region in section" :id="region.direction + 'Group'" @mouseover="testHover">
      <polygon :id="region.direction + 'CW'" :class="region.direction + 'Flag'" :points="region.cwBounds" @mouseover="testing(region.direction)" @click="SSRcw(region.direction)"/>
      <polygon :id="region.direction + 'ACW'" :class="region.direction + 'Flag'" :points="region.acwBounds" @mouseover="testing(region.direction)" @click="SSRacw(region.direction)"/>
      <line v-if="(region.direction == 'Top')" class="Divider" x1="95.91" y1="73.64" x2="95.91" y2="10.42"/>
      <line v-if="(region.direction == 'Left')" class="Divider" x1="95.91" y1="73.64" x2="41.16" y2="105.24"/>
      <line v-if="(region.direction == 'Right')" class="Divider" x1="95.91" y1="73.64" x2="150.65" y2="105.24"/>
      <path :class="region.direction + 'Bumper'" :d="region.bumperBounds"/>
      <polygon :id="region.direction + 'Crop'" :class="region.direction + 'Crop'" :points="region.fullBounds"/>
    </g>
    <g id="center">
      <circle class="Core" cx="95.91" cy="72.64" r="17.47"/>
    </g>
    <g id="frame">
      <rect class="Rect" width="200" height="150"/>
    </g>
  </svg>
  `,
  // <g v-for="region in section" class="test">
  data() {
    return {
      section : [
        {
          direction: 'Top',
          cwBounds: '150.65 41.03 95.91 72.63 95.91 9.42 150.65 41.03',
          acwBounds: '95.91 9.42 95.91 72.63 41.16 41.03 95.91 9.42',
          bumperBounds: 'M116.23,60.91,99.52,70.56a7.24,7.24,0,0,1-7.23,0L75.58,60.91a7.23,7.23,0,0,1,3.61-13.49h33.43A7.23,7.23,0,0,1,116.23,60.91Z',
          fullBounds: '150.65 41.03 95.91 72.64 41.16 41.03 95.91 9.43 150.65 41.03',
        },
        {
          direction: 'Left',
          cwBounds: '95.91 72.63 41.16 104.24 41.16 41.03 95.91 72.63',
          acwBounds: '95.91 72.63 95.91 135.85 41.16 104.24 95.91 72.63',
          bumperBounds: 'M82.42,99.73,65.71,70.78a7.22,7.22,0,0,1,9.87-9.87l16.71,9.65a7.2,7.2,0,0,1,3.61,6.25v19.3A7.22,7.22,0,0,1,82.42,99.73Z',
          fullBounds: '95.91 135.85 41.16 104.24 41.16 41.03 95.91 72.64 95.91 135.85',
        },
        {
          direction: 'Right',
          cwBounds: '150.65 41.03 150.65 104.24 95.91 72.63 150.65 41.03',
          acwBounds: '150.65 104.24 95.91 135.85 95.91 72.63 150.65 104.24',
          bumperBounds: 'M95.9,96.11V76.81a7.21,7.21,0,0,1,3.62-6.25l16.71-9.65a7.22,7.22,0,0,1,9.87,9.87l-16.71,29A7.23,7.23,0,0,1,95.9,96.11Z',
          fullBounds: '150.65 104.24 95.91 135.85 95.91 72.64 150.65 41.03 150.65 104.24',
        },
      ],
      angle : trueAngle,
    }
  },
  created() {
    Event.$on('angShift', function(e) {
      this.angle = e;
    })
  },
  methods: {
    testHover : function(e) {
      console.log('Hovering over group');
    },
    testing : function(e) {
      console.log('Hovering over ' + e);
    },
    SSRcw : function(dir) {
      trueAngle = (trueAngle > 0) ? trueAngle * -1 : trueAngle;
      console.log(`SSRcw('${trueAngle}', '${dir}')`);
      // csInterface.evalScript(`SSR('${trueAngle}', '${dir}')`, function(e){
      //
      // })
    },
    SSRacw : function(dir) {
      trueAngle = (trueAngle < 0) ? trueAngle * -1 : trueAngle;
      console.log(`SSRacw('${trueAngle}', '${dir}')`);
      // csInterface.evalScript(`SSR('${trueAngle}', '${dir}')`, function(e){
      //
      // })
    },
    highlightThis: function(section) {
      this.section.forEach(function(v,i,a){
        var target = document.getElementById(v.direction);
        if (v == section) {
          target.style.opacity = 1;
        } else {
          target.style.opacity = .5;
        }
      });
    },
    minimizeAll: function() {
      this.section.forEach(function(v,i,a){
        var target = document.getElementById(v.direction);
        target.style.transform = 'scale(.375)';
        target.style.opacity = 1;
      });
      changeCSSVar('dimmed', 'rgba(0,0,0,0)');
    },
    // normalizeAll: function() {
    //   this.section.forEach(function(v,i,a){
    //     var target = document.getElementById(v.direction);
    //     target.style.transform = 'scale(1)';
    //     target.style.opacity = .5;
    //   });
    //   changeCSSVar('dimmed', 'rgba(0,0,0,.225)');
    // },
  }
})



// Vue.component('anno', {
//   props: ['state'],
//   template: `
//     <span class="anno-text" @newAnno="updateData">{{ text }}</span>
//   `,
//   data() {
//     return {
//       text : 'default',
//     }
//   },
//   methods: {
//     updateData: function(newData) {
//       this.text = newData;
//     }
//   },
// })

Vue.component('toolbar', {
  template: `
    <div class="adobe-toolbar">
      <div class="adobe adobe-btn-switch" @click="changeAngle(10)">
        <span>10</span>
      </div>
      <div class="adobe adobe-btn-switch-on" @click="changeAngle(30)">
        <span>30</span>
      </div>
      <div class="adobe adobe-btn-switch" @click="changeAngle(40)">
        <span>40</span>
      </div>
      <div class="adobe-toolbar-divider"></div>
    </div>
  `,
  methods: {
    changeAngle : function(newAng) {
      trueAngle = newAng;
      console.log('toolbar works with ' + newAng);
      console.log('true has been shifted to ' + trueAngle);
      Event.$emit('angShift', newAng)
    }
  }
})


var app = new Vue({
  el: '#app',
  data: {
    // ang: 30,
  },
  // methods: {
  //   updateAngle : function(newAngle) {
  //     this.ang = newAngle;
  //   },
  // },
  // created() {
  //   Event.$on('angShift', function(e) {
  //     this.ang = e;
  //     console.log(this.ang);
  //   })
  //   // console.log('Hello');
  // }
});
