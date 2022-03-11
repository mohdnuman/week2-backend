const Course=require('../../models/course');
const Lecture=require('../../models/lecture');


module.exports.createLecture = async function (req, res) {
    try {
      Lecture.uploadedVideo(req, res, async function (err) {
        if (err) console.log("**********Multer Error :", err);
  
        let lecture = await Lecture.create({
          name: req.body.name,
        });
        let course = await Course.findById(req.body.courseId);
  
        course.lectures.push(lecture);
        course.save();
        course = await course.populate("lectures");
  
        if (req.file) {
          if (lecture.video) {
            if (fs.existsSync(path.join(__dirname, "..", lecture.video))) {
              fs.unlinkSync(path.join(__dirname, "..", lecture.video));
            }
          }
          lecture.video = Lecture.videoPath + "/" + req.file.filename;
        }
        lecture.save();
        // return res.redirect('back');
        return res.status(200).json({
          data: {
            lecture: lecture,
          },
          statusText: "lecture created!",
        });
      });
    } catch (err) {
      console.log("error occurred:", err);
      return res.json(500, {
        message: "internal server error!",
      });
    }
  };