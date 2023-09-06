const elements = document.getElementById("elements");

fetch("http://localhost:5000/images")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((jsonData) => {
    jsonData.map((item) => {
      elements.innerHTML = `
            <img src="${item.s3Link}" alt="img"/>
            <img src="${item.s3Link}" alt="img"/>
        `;
      console.log(item.s3Link);
    });
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error("Fetch Error:", error);
  });
