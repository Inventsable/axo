var csInterface = new CSInterface();
var appSkin = csInterface.hostEnvironment.appSkinInfo;
var sysPath = csInterface.getSystemPath(SystemPath.EXTENSION);
var logPath = sysPath + "/log/";
var hostPath = sysPath + "/host/";
var appName = csInterface.hostEnvironment.appName;
var prevScan;


loadUniversalJSXLibraries();
// Full 30
// loadJSX('axo30.jsx');
// loadJSX('axoTags.jsx')

// Partial 40
// loadJSX('axo1040.jsx');


loadJSX('axo30Tags.jsx')
scanningSelection(true);

const axo = {
  bg: document.getElementById('panel'),
  colorLabel: ['Top', 'Left', 'Right'],
  color: ['#915059', '#988F53', '#4A6F91'],
  isSleeping: false,
  hasTags: false,
  tags: [],
  tagList: [],
  mirror: [],
  wake : function() {
    for (var i = 0; i < this.color.length; i++) {
      if (!this.hasTags) {
        changeCSSVar('color' + this.colorLabel[i] + 'CW', this.color[i]);
        changeCSSVar('color' + this.colorLabel[i] + 'ACW', this.color[i]);
      }
    }
    // changeCSSVar('colorCenter', '#323232');
    // changeCSSVar('coreOpacity', '1');
    this.isSleeping = false;
  },
  sleep : function() {
    for (var i = 0; i < this.color.length; i++) {
      changeCSSVar('color' + this.colorLabel[i] + 'CW', '#545454');
      changeCSSVar('color' + this.colorLabel[i] + 'ACW', '#545454');
    }
    // changeCSSVar('colorCenter', '#323232');
    this.isSleeping = true;
  },
  reset : function() {
    if (this.isSleeping) {
      if (this.hasTags) {
        try {
          this.colorTags();
        } catch(err) {
          this.hasTags = false;
          this.reset();
        }
      } else {
        for (var i = 0; i < this.color.length; i++) {
          changeCSSVar('color' + this.colorLabel[i] + 'CW', '#545454');
          changeCSSVar('color' + this.colorLabel[i] + 'ACW', '#545454');
        }
      }
    } else {
      if (this.hasTags) {
        try {
          this.colorTags();
        } catch(err) {
          this.hasTags = false;
          this.reset();
        }
      } else {
        for (var i = 0; i < this.color.length; i++) {
          changeCSSVar('color' + this.colorLabel[i] + 'CW', this.color[i]);
          changeCSSVar('color' + this.colorLabel[i] + 'ACW', this.color[i]);
        }
      }
    }
  },
  colorTags : function() {
    var thisTag = this.tagList[0];
    var dir = thisTag.match(/\w*(p|t)(?=(ACW)|(CW))/gm);
    // console.log(dir);
    var side = dir[0];
    changeCSSVar('color' + dir + 'CW', getCSSVar(`color${side}`))
    changeCSSVar('color' + dir + 'ACW', getCSSVar(`color${side}`))
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


function scanTags(...args) {
  axo.tags = [];
  if (args.length < 1) {
    csInterface.evalScript(`readTags()`, function(data){
      var res = data.split(',');
      if (res.length > 1) {
        for (var i = 0; i < res.length; i++) {
          axo.tags.push(res[i].split(';'));
        }
      }
      var writing = '';
      var valid = 0;
      var err = [];
      axo.mirror = [];
      axo.tags.forEach(function(v,i,a){
        axo.mirror.push(v[1]);
        if (i < 1) {
          writing += 'Total tags:\r\n'
          axo.tagList.push(v[1])
        } else {
          for (var u = 0; u < axo.tagList.length; u++) {
            if (axo.tagList[u] == v[1])
              err.push(v[1]);
          }
        }
        if (v.length > 1) {
          writing += "\tpageItem[" + v[0] + "] : " + v[1] + '\r\n';
        }
      });
      if (err.length) {
        axo.hasTags = true;
        console.log(axo.mirror);
        console.log(axo.tagList);
        axo.tagList = [ ...new Set(axo.mirror) ];
        console.log(axo.tagList);
      }
      // for (var e = 0; e < axo.tags.length; e++) {
      //   console.log(axo.tags[e]);
      //   if (axo.tags[e].length > 1) {
      //     writing += axo.tags[e][1] + '\r\n';
      //   }
      // }
      if (writing !== '') {
        var vOutput = '';
        for (var un = 0; un < axo.tagList.length; un++) {
          vOutput += "\t" + axo.tagList[un] + "\r\n"
        }
        writing +=  "\r\nUnique tags:\r\n" + vOutput
        toPlayWrite(axo.tags.length + ' SSR tags detected', writing)
        for (var z = 0; z < axo.tagList.length; z++) {
          var dir = axo.tagList[z].match(/\w*(p|t)(?=(ACW)|(CW))/gm);
          var side = dir[0];
          changeCSSVar('color' + side + 'CW', getCSSVar('color' + side))
          changeCSSVar('color' + side + 'ACW', getCSSVar('color' + side))
          // if (/^T/g.test(axo.tagList[z])) {
          //   console.log('This is top');
          // } else if (/^L/g.test(axo.tagList[z])) {
          //   console.log('This is left');
          // } else if (/^R/g.test(axo.tagList[z])) {
          //   console.log('This is right');
          // }
        }
      } else {
        // resetColors();
        toPlayWrite('No tags detected', '')
      }
    });
  }
}

function scanningSelection(state) {
	if (state) {
		timer = setInterval(function(){csInterface.evalScript('readSelection()', function(newScan){
      if (prevScan) {
        changeCSSVar('colorCenter', '#323232')
      } else if (axo.isSleeping) {
        changeCSSVar('colorCenter', '#545454')
      } else {
        changeCSSVar('colorCenter', '#545454')
      }

      if (axo.hasTags) {
        try {
          axo.colorTags();
        } catch(e){axo.reset()}
      }
      if (newScan == prevScan) return;
      // if (newScan > 0)
      // console.log(newScan);
      if (newScan) {
        // if (axo.hasTags) {
          axo.tagList = [];
          axo.reset()
          scanTags();
        // }
        // toPlayWrite('Selection changed to ' + newScan)
      } else {
        axo.hasTags = false;
        axo.tags = [];
        axo.tagList = [];

        axo.reset();
        toPlayWrite('Nothing selected', '')
      }
      // console.log('Selection changed');
      prevScan = newScan;
    })}, 50);
		console.log("Scanning selection on");
	} else {
		clearInterval(timer);
		console.log("Scanning selection off");
	}
}

window.Event = new Vue();
var trueAngle = 30;

Vue.component('axo', {
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
    <g v-for="region in section" :id="region.direction + 'Group'" @mouseover="highlightThis(region)" @mouseleave="normalizeAll">
      <polygon :id="region.direction + 'CW'" :class="region.direction + 'FlagCW'" :points="region.cwBounds" @click="SSRcw(region.direction)"/>
      <polygon :id="region.direction + 'ACW'" :class="region.direction + 'FlagACW'" :points="region.acwBounds" @click="SSRacw(region.direction)"/>
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
        if (!axo.hasTags) {
          // console.log('No tags');
          csInterface.evalScript(`readTags('${dir}CW');`, function(reload){
            prevScan = 0;
          })
        }
      })
    },
    SSRacw : function(dir) {
      trueAngle = (trueAngle < 0) ? trueAngle * -1 : trueAngle;
      // console.log(`SSRacw('${trueAngle}', '${dir}')`);
      csInterface.evalScript(`SSR('${trueAngle}', '${dir}')`, function(e){
        if (!axo.hasTags) {
          // console.log('No tags');
          csInterface.evalScript(`readTags('${dir}ACW');`, function(reload){
            prevScan = 0;
          })
        }
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
        // changeCSSVar("colorCenter", '#323232');
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
        // changeCSSVar("colorCenter", '#323232');
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

var app = new Vue({
  el: '#app',
  data: {
    bg: document.getElementById('panel'),
    colorLabel: ['R', 'G', 'B'],
    color: ['#915059', '#988F53', '#4A6F91'],
    isSleeping: false,
  },
});
