import 'dart:io';
import 'package:sass/sass.dart' as sass;

void main(List<String> arguments) {
  compile();
}

void compile() {
  var destiny = 'src/css/';

  Directory dir = Directory('src/scss/');
  dir.list(recursive: false).forEach((f) {
    var split = f.path.split("/");
    var name = split[split.length - 1];
    var result = sass.compileToResult(f.path);
    String outName = '${destiny}${name}.css';
    
    outName = outName.replaceAll('.scss', '');

    new File(outName).writeAsStringSync(result.css);
  });
}
