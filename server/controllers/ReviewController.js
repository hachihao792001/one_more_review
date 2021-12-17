import Film from "../models/Film.js";
import Review from "../models/Review.js";

export const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      return res
        .status(200)
        .json({ success: true, message: "finding review", review });
    }
    return res
      .status(404)
      .json({ success: false, message: "incorrect review" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const createReview = async (req, res) => {
  try {
    const { idFilm, content, rating } = req.body;
    const idUser=req.user._id;
    if (!idUser) {
      return res
        .status(401)
        .json({ success: false, message: "missing user id" });
    }
    if (!idFilm) {
      return res
        .status(401)
        .json({ success: false, message: "missing film id" });
    }
    const newReview = new Review({ idFilm, idUser, content, rating });
    try {
      await newReview.save();
      let film=await Film.findOne({'_id':newReview.idFilm})
      film.reviewList.push(newReview._id)
      let avgRating=0;
      for (let rating of film.reviewList){
            const review=await Review.findById(rating);
            avgRating+=review.rating;
      }
      avgRating=avgRating/(film.reviewList.length)
      film.avgRating=avgRating;
      await film.save()
    } catch (error) {
      console.log(error);
      return res
        .status(404)
        .json({ success: false, message: "error at creating film" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Adding review successfully",
        review: newReview,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    const { content, rating } = req.body;
    if (review) {
      review.content = content || review.content;
      review.rating = rating || review.rating;
      const updatedReview = await review.save();
      return res
        .status(200)
        .json({
          success: true,
          message: "saving succesfully",
          review: updatedReview,
        });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "incorrect review" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect review" });
    }
    let deletedReview = null;
    try {
      deletedReview = await review.remove();
    } catch (error) {
      return res
        .status(404)
        .json({ success: false, message: "can not delete review" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "delete review successfully",
        review: deletedReview,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};


