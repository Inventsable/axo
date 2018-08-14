var csInterface = new CSInterface();
var appSkin = csInterface.hostEnvironment.appSkinInfo;
var sysPath = csInterface.getSystemPath(SystemPath.EXTENSION);
var logPath = sysPath + "/log/";
var hostPath = sysPath + "/host/";
var appName = csInterface.hostEnvironment.appName;

loadUniversalJSXLibraries();
loadJSX('axo30.jsx');

Vue.component('gamepad', {
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
    <title>axoMenu</title>
    <g v-for="item in section" :id="item.direction" class="grow" @mouseover="maximizeThis(item)" @mouseleave="normalizeAll">
      <g @mouseover="$emit('newAnno', item.anno1)" @click="SSRcw(item.direction)">
        <path :class="item.direction + 'Bounds'" :d="item.cwBounds"/>
        <path :class="item.direction + 'Arrow'" :d="item.cwArrow"/>
      </g>
      <g @mouseover="$emit('newAnno', item.anno2)" @click="SSRacw(item.direction)">
        <path :class="item.direction + 'Bounds'" :d="item.acwBounds"/>
        <path :class="item.direction + 'Arrow'" :d="item.acwArrow"/>
      </g>
      <line v-if="(item.direction == 'Top')" :class="item.direction + 'Divider'" x1="95.9" y1="12.46" x2="95.9" y2="60.33"/>
      <line v-if="(item.direction == 'Left')" :class="item.direction + 'Divider'" x1="41.51" y1="106.69" x2="82.97" y2="82.75"/>
      <line v-if="(item.direction == 'Right')" :class="item.direction + 'Divider'" x1="150.31" y1="106.68" x2="108.85" y2="82.74"/>
    </g>
    <g id="center" @mouseover="minimizeAll" @mouseleave="normalizeAll">
      <path data-name="center" class="center" d="M95.91,56.16A19.12,19.12,0,1,1,76.8,75.27,19.12,19.12,0,0,1,95.91,56.16"/>
    </g>
    <g id="frame">
      <rect class="rect-bounds" width="200" height="150"/>
    </g>
  </svg>
  `,
  data() {
    return {
      section : [
        {
          direction: 'Top',
          cwBounds: 'M149.4,40.65,99.47,70.22a7,7,0,0,1-3.57,1v-64a7,7,0,0,1,3.57,1L149.4,37.76A1.68,1.68,0,0,1,149.4,40.65Z',
          cwArrow: 'M111,31.85a1.08,1.08,0,0,0-.92.19,1.06,1.06,0,0,0-.41.84V40a1,1,0,0,0,.42.84,1.05,1.05,0,0,0,.64.22.84.84,0,0,0,.27,0l17.57-4.67Z',
          acwBounds: 'M95.9,7.21v64a7,7,0,0,1-3.57-1L42.4,40.65a1.68,1.68,0,0,1,0-2.89L92.33,8.19A7,7,0,0,1,95.9,7.21Z',
          acwArrow: 'M80.84,31.85,63.26,36.39l17.58,4.67a.84.84,0,0,0,.27,0,1.08,1.08,0,0,0,.64-.22,1.06,1.06,0,0,0,.41-.84V32.88a1.06,1.06,0,0,0-1.32-1Z',
        },
        {
          direction: 'Left',
          cwBounds: 'M39.17,46.26,89.75,74.72a7,7,0,0,1,2.62,2.6L37,109.31a6.91,6.91,0,0,1-.93-3.58l.64-58A1.68,1.68,0,0,1,39.17,46.26Z',
          cwArrow: 'M45.91,66.45,50.78,84a1,1,0,0,0,.62.69,1.1,1.1,0,0,0,.4.08,1.13,1.13,0,0,0,.53-.14L58.53,81a1,1,0,0,0,.52-.78,1.09,1.09,0,0,0-.3-.89Z',
          acwBounds: 'M37,109.31l55.41-32a7,7,0,0,1,.95,3.58l-.65,58a1.68,1.68,0,0,1-2.5,1.45L39.6,111.91A6.87,6.87,0,0,1,37,109.31Z',
          acwArrow: 'M73.82,105.43a1.06,1.06,0,0,0-1.55-.64l-6.21,3.59a1.06,1.06,0,0,0-.22,1.65l12.71,13Z',
        },
        {
          direction: 'Right',
          cwBounds: 'M99.15,138.92l-.64-58a6.94,6.94,0,0,1,.94-3.58l55.41,32a6.91,6.91,0,0,1-2.63,2.6l-50.58,28.46A1.68,1.68,0,0,1,99.15,138.92Z',
          cwArrow: 'M125.76,108.37l-6.21-3.58a1,1,0,0,0-.93-.07,1,1,0,0,0-.61.71L113.27,123,126,110a1,1,0,0,0-.22-1.65Z',
          acwBounds: 'M154.86,109.3l-55.41-32a6.91,6.91,0,0,1,2.63-2.6l50.57-28.46a1.68,1.68,0,0,1,2.5,1.45l.65,58A7,7,0,0,1,154.86,109.3Z',
          acwArrow: 'M133.07,79.33a1.06,1.06,0,0,0-.3.88,1.1,1.1,0,0,0,.52.78l6.21,3.58a1.07,1.07,0,0,0,.52.14,1.15,1.15,0,0,0,.41-.08,1,1,0,0,0,.61-.69l4.87-17.49Z',
        },
      ],
    }
  },
  methods: {
    SSRcw : function(msg) {
      console.log(`SSR(-30, '${msg}')`);
      csInterface.evalScript(`SSR('-30', '${msg}')`, function(e){
        // console.log('Successful ' + e.data);
      })
    },
    SSRacw : function(msg) {
      console.log(`SSR(30, '${msg}')`);
      csInterface.evalScript(`SSR('30', '${msg}')`, function(e){
        // console.log('Successful ' + e.data);
      })
    },
    maximizeThis: function(section) {
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
    normalizeAll: function() {
      this.section.forEach(function(v,i,a){
        var target = document.getElementById(v.direction);
        target.style.transform = 'scale(1)';
        target.style.opacity = .5;
      });
      changeCSSVar('dimmed', 'rgba(0,0,0,.225)');
    },
  }
})

Vue.component('anno', {
  props: ['state'],
  template: `
    <span class="anno-text" @newAnno="updateData">{{ text }}</span>
  `,
  data() {
    return {
      text : 'default',
    }
  },
  methods: {
    updateData: function(newData) {
      this.text = newData;
    }
  }
})

Vue.component('toolbar', {
  template: `
    <div class="adobe-toolbar">
      <div class="adobe adobe-btn-switch">
        <span class="adobe-icon-folder"></span>
      </div>
      <div class="adobe adobe-btn-switch">
        <span class="adobe-icon-file"></span>
      </div>
      <div class="adobe-toolbar-divider"></div>
    </div>
  `,
})


var app = new Vue({
  el: '#app',
  data: {

  },
  methods: {

  },
});
