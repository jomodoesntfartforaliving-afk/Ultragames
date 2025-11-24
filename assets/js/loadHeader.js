// Load header into #navbar
fetch("components/header.html")
  .then(r => r.text())
  .then(html => {
      document.getElementById("navbar").innerHTML = html;
  });
