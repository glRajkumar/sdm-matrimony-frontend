import { sendApiReq, endPoints } from "@/services";

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

export function getPartnerPreferences() {
  return sendApiReq({
    url: endPoints.getPartnerPreferences,
  })
}

export function getUnlockedProfiles() {
  return sendApiReq({
    url: endPoints.getUnlockedProfiles,
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

export function deleteImage(_id: string) {
  return sendApiReq({
    url: `${endPoints.deleteImage}/${_id}`,
    method: "DELETE",
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

export function unlockProfile(data: { _id: string }) {
  return sendApiReq({
    url: endPoints.unlockProfile,
    method: "POST",
    data,
  })
}
