

//here is implement delete 

import catchAsync from "../../../utils/catchAsync";
import Blog from "../tour/tour.model";
import User from "../user/user.model";

const blockUser = catchAsync(async (req, res) => {
    const { id } = req.params; // Extract the userId from the request parameters
  
    // Find the user and update the isBlocked property
    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
  
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  
    return res.status(200).json({
      success: true,
      message: 'User blocked successfully',
      statusCode: 200,
    });
  });

  // delete user 

  const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params; // Extract the blog ID from the request parameters
  
    // Find and delete the blog
    const blog = await Blog.findByIdAndDelete(id);
  
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }
  
    return res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
    });
  });


export const adminAction = {
    blockUser,
    deleteBlog
}
  
  

