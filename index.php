<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <?php if( $_SERVER['HTTP_HOST'] === 'kaloyan.elegance.bg') { ?>
      <base href="https://kaloyan.elegance.bg/casinoble/">
    <?php } ?>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./resources/dist/styles/main.css">
    <title>Casinoble Animation</title>
  </head>
  <body>
    <?php include './templates/header.php'; ?>
    <?php include './templates/scene-1.php'; ?>
    <?php include './templates/scene-2.php'; ?>
    <?php include './templates/scene-3.php'; ?>
    <?php include './templates/scene-4.php'; ?>
    <?php include './templates/scene-5.php'; ?>
    <?php include './templates/scene-6.php'; ?>
    <?php include './templates/about.php'; ?>
    <?php include './templates/final.php'; ?>
    <?php include './templates/footer.php'; ?>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.4/lottie.min.js"></script>
    <script type="text/javascript" src="./resources/assets/scripts/element.js"></script>
    <script>
      setTimeout(() => {
        bodymovin.loadAnimation({
          container: document.getElementById("final"),
          animationData: element,
          renderer: "svg",
          autoplay: true,
          loop: false,
        });
      }, 36.6 * 1000);
    </script>
  </body>
</html>
