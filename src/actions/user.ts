import sendApiReq from "@/utils/sendApiReq";
import endPoints from "@/utils/endPoints";

export function getMatches(params: any) {
  return sendApiReq({
    url: endPoints.getMatches,
    params,
  })
}

export function getLikesList(params: any) {
  return sendApiReq({
    url: endPoints.getLikesList,
    params,
  })
}

export function getUserDetails(_id: string) {
  return sendApiReq({
    url: `${endPoints.getUserDetails}/${_id}`,
  })
}

export function updateProfile(data: any) {
  return sendApiReq({
    url: endPoints.updateProfile,
    method: "PUT",
    data,
  })
}

export function addImages(data: any) {
  return sendApiReq({
    url: endPoints.addImages,
    method: "PUT",
    data,
  })
}

export function addLiked(data: any) {
  return sendApiReq({
    url: endPoints.addLiked,
    method: "POST",
    data,
  })
}

export function removeLiked(data: any) {
  return sendApiReq({
    url: endPoints.removeLiked,
    method: "POST",
    data,
  })
}