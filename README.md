## axo

vue build with global components:

```html
<!-- index.html -->
<body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <div id="app">
    <toolbar></toolbar>
    <toolbar></toolbar>
    <toolbar></toolbar>
  </div>
<script src="./main.js" type="text/javascript"></script>
</body>
```

```javascript
// main.js
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
```
![preview](https://i.imgur.com/j9rpIbd.png)
