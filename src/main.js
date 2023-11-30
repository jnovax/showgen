const {
  FFCreatorCenter,
  FFScene,
  FFImage,
  FFText,
  FFCreator,
} = require("ffcreatorlite");
const path = require("path");
const colors = require("colors");

const createFFTask = () => {
  const cacheDir = path.join(__dirname, "../cache/");
  const outputDir = path.join(__dirname, "../output/");
  const img_bg = path.join(__dirname, "../assets/img_bg.jpg");
  const img_1 = path.join(__dirname, "../assets/img_1.jpg");
  const img_2 = path.join(__dirname, "../assets/img_2.jpg");
  const audio = path.join(__dirname, "../assets/audio.mp3");

  // create creator instance
  const creator = new FFCreator({
    cacheDir,
    width: 720,
    height: 1280,
    log: true,
  });

  // create FFScene
  const scene1 = new FFScene();
  const scene2 = new FFScene();

  // scene1
  const fbg = new FFImage({ path: img_bg });
  scene1.addChild(fbg);

  const text = new FFText({ text: "Hello", x: 100, y: 100 });
  text.setColor("#ffffff");
  text.setBackgroundColor("#000000");
  text.addEffect("fadeIn", 1, 1);
  scene1.addChild(text);

  //   const fimg1 = new FFImage({ path: img_1, x: 30, y: 60, width: 500 });
  //   fimg1.addEffect("moveInRight", 1.5, 1.2);
  //   scene1.addChild(fimg1);
  const fimg1 = new FFImage({ path: img_1, width: 500 });
  fimg1.addAnimate({
    type: "move",
    showType: "in",
    time: 6,
    delay: 0,
    from: { x: -500, y: 30 },
    to: { x: 30, y: 30 },
  });
  scene1.addChild(fimg1);

  const fimg2 = new FFImage({ path: img_2, width: 500 });
  fimg2.addAnimate({
    type: "move",
    showType: "in",
    time: 6,
    delay: 4,
    from: { x: 720, y: 560 },
    to: { x: 160, y: 560 },
  });
  scene1.addChild(fimg2);

  scene1.setDuration(15);
  creator.addChild(scene1);

  creator.addAudio(audio);
  creator.setOutput(path.join(outputDir, "demo.mp4"));
  creator.start();

  creator.on("progress", (e) => {
    console.log(
      colors.yellow(`FFCreatorLite progress: ${(e.percent * 100) >> 0}%`)
    );
  });

  creator.on("complete", (e) => {
    console.log(
      colors.magenta(
        `FFCreatorLite completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `
      )
    );
  });
};

FFCreatorCenter.addTask(createFFTask);
