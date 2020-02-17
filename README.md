# README
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Upgrade Road</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .container {
      display: flex;
      align-items: flex-end;
      height: 100vh;
      background: #ddd;
    }

    .column {
      flex: 1;
      text-align: center;
      background: #0099CC;
      color: #fff;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
</head>

<body>
  <div id="app">
    <div class="container">
      <div class="column">
        Vue
      </div>

      <div class="column">
        Angular
      </div>

      <div class="column">
        React
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app'
    });
  </script>
</body>

</html>