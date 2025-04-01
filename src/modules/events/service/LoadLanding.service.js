import { api } from "../../global/config/api"

export const LoadLanding = async ({slug}) => {

  try {
    const requestLanding = await api.get(`/landing-page/landing/${slug}`)

    if (requestLanding.status !== 200) {
      return null;
    }

    return requestLanding.data.result;

  } catch (error) {
    console.error(error);
    return null
  }
}
