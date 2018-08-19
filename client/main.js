var csInterface = new CSInterface();
var appSkin = csInterface.hostEnvironment.appSkinInfo;
var sysPath = csInterface.getSystemPath(SystemPath.EXTENSION);
var logPath = sysPath + "/log/";
var hostPath = sysPath + "/host/";
var appName = csInterface.hostEnvironment.appName;

loadUniversalJSXLibraries();

// Full 30
loadJSX('axo30.jsx');

// Partial 40
// loadJSX('axo1040.jsx');

const axo = {
  bg: document.getElementById('panel'),
  colorLabel: ['R', 'G', 'B'],
  color: ['#915059', '#988F53', '#4A6F91'],
  isSleeping: false,
  wake : function() {
    for (var i = 0; i < axo.color.length; i++) {
      // changeCSSVar('color' + this.colorLabel[i] + 'dark', this.color[i]);
      changeCSSVar('color' + this.colorLabel[i] + 'outline', '#323232');
    }
    // changeCSSVar('colorCenter', '#545454')
    changeCSSVar('coreOpacity', '1');
    changeCSSVar('cropOpacity', '1');
    changeCSSVar('allScale', '1');
    changeCSSVar('allOpacity', '1');
    // changeCSSVar('bumperOpacity', '.5');
    this.isSleeping = false;
  },
  sleep : function() {
    for (var i = 0; i < axo.color.length; i++) {
      // changeCSSVar('color' + axo.colorLabel[i] + 'dark', '#323232');
      changeCSSVar('color' + axo.colorLabel[i] + 'outline', axo.color[i]);
    }
    changeCSSVar('coreOpacity', '0');
    changeCSSVar('cropOpacity', '0');
    changeCSSVar('allScale', '.875');
    changeCSSVar('allOpacity', '.5');
    changeCSSVar('bumperOpacity', '0');
    this.isSleeping = true;
  }
}

axo.bg.addEventListener('mouseover', function(e){
  if (((e.clientX < 2) | (e.clientX > (window.innerWidth - 2))) | ((e.clientY < 2) | (window.innerHeight - 2)))
    axo.wake();
})

axo.bg.addEventListener('mouseout', function(e){
  if (((e.clientX < 10) | (e.clientX > (window.innerWidth - 5))) | ((e.clientY < 10) | (window.innerHeight - 5)))
    axo.sleep();
})


window.Event = new Vue();
var trueAngle = 30;

Vue.component('axo', {
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
    <g v-for="region in section" :id="region.direction + 'Group'" @mouseover="highlightThis(region)" @mouseleave="normalizeAll">
      <polygon :id="region.direction + 'CW'" :class="region.direction + 'Flag'" :points="region.cwBounds" @click="SSRcw(region.direction)"/>
      <polygon :id="region.direction + 'ACW'" :class="region.direction + 'Flag'" :points="region.acwBounds" @click="SSRacw(region.direction)"/>
      <line v-if="(region.direction == 'Top')" class="TopDivider" x1="95.91" y1="73.64" x2="95.91" y2="10.42"/>
      <line v-if="(region.direction == 'Left')" class="LeftDivider" x1="95.91" y1="73.64" x2="41.16" y2="105.24"/>
      <line v-if="(region.direction == 'Right')" class="RightDivider" x1="95.91" y1="73.64" x2="150.65" y2="105.24"/>
      <path :class="region.direction + 'Bumper'" :d="region.bumperBounds"/>
      <polygon :id="region.direction + 'Crop'" :class="region.direction + 'Crop'" :points="region.fullBounds"/>
    </g>
    <g id="center">
      <circle id="core" class="Core" @mouseover="minimizeAll" @mouseleave="maximizeAll" cx="95.91" cy="72.64" r="15.19"/>
    </g>
    <g id="frame">
      <rect class="Rect" width="200" height="150"/>
    </g>
  </svg>
  `,
  // core // cx="95.91" cy="72.64" r="17.47"
  data() {
    return {
      section : [
        {
          direction: 'Top',
          elt: document.getElementById('TopGroup'),
          color: '#f06e81',
          colorDark: '#915059',
          cwBounds: '150.65 41.03 95.91 72.63 95.91 9.42 150.65 41.03',
          acwBounds: '95.91 9.42 95.91 72.63 41.16 41.03 95.91 9.42',
          bumperBounds: 'M116.23,60.91,99.52,70.56a7.24,7.24,0,0,1-7.23,0L75.58,60.91a7.23,7.23,0,0,1,3.61-13.49h33.43A7.23,7.23,0,0,1,116.23,60.91Z',
          fullBounds: '150.65 41.03 95.91 72.64 41.16 41.03 95.91 9.43 150.65 41.03',
        },
        {
          direction: 'Left',
          elt: document.getElementById('LeftGroup'),
          color: '#ffed75',
          colorDark: '#988F53',
          cwBounds: '95.91 72.63 41.16 104.24 41.16 41.03 95.91 72.63',
          acwBounds: '95.91 72.63 95.91 135.85 41.16 104.24 95.91 72.63',
          bumperBounds: 'M82.42,99.73,65.71,70.78a7.22,7.22,0,0,1,9.87-9.87l16.71,9.65a7.2,7.2,0,0,1,3.61,6.25v19.3A7.22,7.22,0,0,1,82.42,99.73Z',
          fullBounds: '95.91 135.85 41.16 104.24 41.16 41.03 95.91 72.64 95.91 135.85',
        },
        {
          direction: 'Right',
          elt: document.getElementById('RightGroup'),
          color: '#6297f0',
          colorDark: '#4A6F91',
          cwBounds: '150.65 41.03 150.65 104.24 95.91 72.63 150.65 41.03',
          acwBounds: '150.65 104.24 95.91 135.85 95.91 72.63 150.65 104.24',
          bumperBounds: 'M95.9,96.11V76.81a7.21,7.21,0,0,1,3.62-6.25l16.71-9.65a7.22,7.22,0,0,1,9.87,9.87l-16.71,29A7.23,7.23,0,0,1,95.9,96.11Z',
          fullBounds: '150.65 104.24 95.91 135.85 95.91 72.64 150.65 41.03 150.65 104.24',
        },
      ],
      angle : trueAngle,
      directions : ['Top', 'Left', 'Right'],
      colors : ['R', 'G', 'B'],
      core : document.getElementById('core'),
    }
  },
  created() {
    Event.$on('angShift', function(e) {
      this.angle = e;
    })
  },
  methods: {
    SSRcw : function(dir) {
      trueAngle = (trueAngle > 0) ? trueAngle * -1 : trueAngle;
      // console.log(`SSRcw('${trueAngle}', '${dir}')`);
      csInterface.evalScript(`SSR('${trueAngle}', '${dir}')`, function(e){

      })
    },
    SSRacw : function(dir) {
      trueAngle = (trueAngle < 0) ? trueAngle * -1 : trueAngle;
      // console.log(`SSRacw('${trueAngle}', '${dir}')`);
      csInterface.evalScript(`SSR('${trueAngle}', '${dir}')`, function(e){

      })
    },
    highlightThis: function(section) {
      var dirs = this.directions;
      changeCSSVar("bumperOpacity", '0');
      // var core = document.getElementById('core');
      this.section.forEach(function(v,i,a){
        if (v == section) {
          // console.log('Match is ' + v.direction);
          changeCSSVar(v.direction + "Divider", '#323232');
          for (var i = 0; i < dirs.length; i++) {
            if (v.direction == dirs[i]) {
              changeCSSVar("colorCenter", v.colorDark);
              changeCSSVar("colorStrCenter", v.colorDark);
              this.core.style.transform = 'scale(.50)';
            }
          }
        } else {
          changeCSSVar(v.direction + "Divider", 'none');
        }
      });
    },
    normalizeAll: function(section) {
      this.section.forEach(function(v,i,a){
        // console.log('Normalizing');
        changeCSSVar("colorCenter", '#323232');
        changeCSSVar("colorStrCenter", '#323232');
        this.core.style.transform = 'scale(1)';
        changeCSSVar("bumperOpacity", '0');
        changeCSSVar(v.direction + "Divider", 'none');
      });
    },
    minimizeAll: function() {
      this.section.forEach(function(v,i,a){
        var target = document.getElementById(v.direction + 'Group');
        target.style.transform = 'scale(.375)';
        changeCSSVar("colorCenter", '#323232');
        // changeCSSVar("bumperOpacity", '1');
        changeCSSVar(v.direction + 'Divider', 'none')
      });
      // changeCSSVar('dimmed', 'rgba(0,0,0,0)');
    },
    maximizeAll: function() {
      this.section.forEach(function(v,i,a){
        var target = document.getElementById(v.direction + 'Group');
        target.style.transform = 'scale(1)';
        // changeCSSVar(v.direction + 'Divider', '#323232')
        // target.style.opacity = .5;
      });
      // changeCSSVar('dimmed', 'rgba(0,0,0,.225)');
    },
  }
})

function getCSSVar(val) {
  return getComputedStyle(document.body).getPropertyValue('--' + val);
}

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

// Vue.component('input-num', {
//   props: ['amt'],
//   template: `
//   <div class="adobe-toolbar">
//     <div class="adobe-inputGroup-num">
//       <input class="adobe adobe-input adobe-input-num" @change="onChange" v-model="this.num">
//     </div>
//   </div>
//   `,
//   data() {
//     return {
//       num: '10px',
//     }
//   },
//   methods: {
//     onChange:function(){
//       console.log(this.num);
//       changeCSSVar("strLG", this.num);
//     }
//   }
// })


var app = new Vue({
  el: '#app',
  data: {
    bg: document.getElementById('panel'),
    colorLabel: ['R', 'G', 'B'],
    color: ['#915059', '#988F53', '#4A6F91'],
    isSleeping: false,
  //   css: [
  //     { coreOpacity : 1 },
  //     { cropOpacity : 1 },
  //     { bumperOpacity : 1 },
  //     { allOpacity : 1 },
  //     { coreOpacity : 1 },
  // ],
  },
  // methods: {
  //   wake : function() {
  //     for (var i = 0; i < this.color.length; i++) {
  //       // changeCSSVar('color' + this.colorLabel[i] + 'dark', this.color[i]);
  //       changeCSSVar('color' + this.colorLabel[i] + 'outline', '#323232');
  //     }
  //     // changeCSSVar('colorCenter', '#545454')
  //     changeCSSVar('coreOpacity', '1');
  //     changeCSSVar('cropOpacity', '1');
  //     changeCSSVar('allScale', '1');
  //     changeCSSVar('allOpacity', '1');
  //     // changeCSSVar('bumperOpacity', '.5');
  //     this.isSleeping = false;
  //   },
  //   sleep : function() {
  //     for (var i = 0; i < this.color.length; i++) {
  //       // changeCSSVar('color' + axo.colorLabel[i] + 'dark', '#323232');
  //       changeCSSVar('color' + axo.colorLabel[i] + 'outline', axo.color[i]);
  //     }
  //     changeCSSVar('coreOpacity', '0');
  //     changeCSSVar('cropOpacity', '0');
  //     changeCSSVar('allScale', '.875');
  //     changeCSSVar('allOpacity', '.5');
  //     changeCSSVar('bumperOpacity', '0');
  //     this.isSleeping = true;
  //   }
  // },
});
