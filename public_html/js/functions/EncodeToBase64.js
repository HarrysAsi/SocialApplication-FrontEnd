function encodeToBase64(file, callback = function(result){}) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      reader.result;
      callback(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}