// You can add error codes here
function ThrowError (errorCode) {
  let errorText;
  
  switch (errorCode)
  {
    case 0:
      errorText = "Value was unassigned or invalid";
      break;
    case 1:
      errorText = "Using static class as a function";
      break;
    case 2:
      errorText = "There is no instance to work with";
      break;
    case 3:
      errorText = "File or source is invalid";
      break;
  }
  
  errorText += `\nError Code: ${errorCode}`;
  
  alert(errorText);
  console.error(errorText);
  throw new Error(errorText);
}
