import path from "path";
import RSA from "node-rsa";
import Generator from "yeoman-generator";

const templateFiles = [
  ".babelrc",
  ".eslintignore",
  ".eslintrc.js",
  ".gitignore",
  "manifest.json",
  "package.json",
  "src/css/config.css",
  "src/css/desktop.css",
  "src/html/config.html",
  "src/js/config.js",
  "src/js/desktop.js",
  "src/js/modules/bind.js",
  "src/js/modules/events.js",
  "webpack.config.js",
];

function generateKey() {
  const key = new RSA({ b: 1024 });
  return key.exportKey("pkcs1-private");
}

export default class KintonePluginGenerator extends Generator {

  constructor(args, options) {
    super(args, options);
  }

  async prompting() {
    const prompts = [
      {
        type: "input",
        name: "author",
        message: "Who is the author of this plugin?",
        default: this.user.git.name()
      },
      {
        type: "input",
        name: "project",
        message: "What is your new kintone plugin name? [1-64chars]",
        default: path.basename(this.destinationRoot())
      },
      {
        type: "input",
        name: "desc",
        message: "Write plugin description. [1-200chars]",
      }
    ];
    this.answers = await this.prompt(prompts);
  }

  async writing() {

    // -> copy template files
    for (const file of templateFiles) {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.answers
      );
    }

    // -> create private.ppk file
    this.fs.write(
      this.destinationPath("private.ppk"),
      generateKey()
    );

  }

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }
}
