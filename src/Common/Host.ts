import App from './App';

export default class Host {
  private id: string;
  private apps: App[];

  // if app is added using addApp and not addAppSorted turns true
  // if getTopApps is called multiple times without any changes in between remains false
  private needsSort: boolean; 

  constructor(id: string) {
    this.id = id;
    this.apps = [];
    this.needsSort = true;
  }

  getId() {
    return this.id;
  }

  addApp(app: App) {
    this.apps.push(app)
    this.needsSort = true;
  }

  getApps() {
    return this.apps;
  }

  addAppSorted(app: App) {
    // O(n) worst time complexity
    // O(n) worst space complexity
    let i = 0;
    while (app.getApdex() < this.apps[i].getApdex() && i < this.apps.length) {
      i++;
    }
    this.apps.splice(i, 0, app);
  }

  removeApp(app: App) {
    // O(n) worst time complexity
    // O(n) worst space complexity
    var index = this.apps.indexOf(app);
    if (index > -1) {
      this.apps.splice(index, 1);
    }
  }

  getTopApps(n: number) {
    // O(nk) worst time complexity
    // O(n+k) worst space complexity
    if(this.needsSort) {
      radixSortLSD(this.apps);
      this.needsSort = false;
    }

    return this.apps.slice(0, n);
  }

}

// Radix sort algorithm
// O(nk) worst time complexity
// O(n+k) worst space complexity
// Not followed ISP for simplicity and 
// This algorithm is specific for hosts because sorts a Host field (apdex)
export function radixSortLSD(_input_array) {
  var extractDigit = function (a, bitMask, shiftRightAmount) {
    var digit = (a.getApdex() & bitMask) >>> shiftRightAmount; // extract the digit we are sorting based on
    return digit;
  }

  let items = _input_array;
  var numberOfBins = 256;
  var Log2ofPowerOfTwoRadix = 8;
  var _output_array = new Array(items.length);
  var count = new Array(numberOfBins);
  var _output_array_has_result = false;

  var bitMask = 255;
  var shiftRightAmount = 0;

  var startOfBin = new Array(numberOfBins);
  var endOfBin = new Array(numberOfBins);

  while (bitMask != 0) // end processing digits when all the mask bits have been processed and shifted out, leaving no bits set in the bitMask
  {
    for (var i = 0; i < numberOfBins; i++)
      count[i] = 0;
    for (var _current = 0; _current < items.length; _current++) // Scan the array and count the number of times each digit value appears - i.e. size of each bin
      count[extractDigit(items[_current], bitMask, shiftRightAmount)]++;

    startOfBin[0] = endOfBin[0] = 0;
    for (var i = 1; i < numberOfBins; i++)
      startOfBin[i] = endOfBin[i] = startOfBin[i - 1] + count[i - 1];
    for (var _current = items.length - 1; _current >= 0; _current--)
      _output_array[endOfBin[extractDigit(items[_current], bitMask, shiftRightAmount)]++] = items[_current];

    bitMask <<= Log2ofPowerOfTwoRadix;
    shiftRightAmount += Log2ofPowerOfTwoRadix;
    _output_array_has_result = !_output_array_has_result;

    var tmp = items;
    items = _output_array;
    _output_array = tmp; // swap input and output arrays
  }
  if (_output_array_has_result)
    for (var _current = 0; _current < items.length; _current++) // copy from output array into the input array
      items[_current] = _output_array[_current];

  return items;
}