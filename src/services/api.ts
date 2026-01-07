import axios from 'axios';
import type { LoginResponse, MemberData, DashboardStats, Event, QuestionnaireFormData, ProfileFormData, WebinarAccess, WebinarData, ApiResponse, WebinarStreamingData, Article, ExistingContactRequest, Assignee, AjaxResponse, AffordabilityFormData } from '../types';

// Helper functions for formatting event data
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatTime(timeString: string): string {
  const timeParts = timeString.split(':');
  const hours = parseInt(timeParts[0], 10);
  const minutes = timeParts[1];

  const endHours = (hours + 2) % 24;
  return `${hours}:${minutes} - ${endHours}:${minutes}`;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

async function fetchPost<T>(endpoint: string, body: Record<string, any>, isJson: boolean = false): Promise<T> {
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': isJson ? 'application/json' : 'application/x-www-form-urlencoded',
      },
      body: isJson ? JSON.stringify(body) : new URLSearchParams(body).toString(),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Fetch Error:`, error);
    throw error;
  }
}

async function fetchGet<T>(endpoint: string, params: Record<string, string>): Promise<T> {
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${apiUrl}/${endpoint}?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Fetch Error:`, error);
    throw error;
  }
}

// Simple response interface for API calls that return Success/Msg pattern
interface SimpleApiResponse {
  Success: boolean;
  Msg: unknown;
  InsertId?: number;
  AlertType?: string;
}

export async function subscribeUser(formData: {
  first_name: string;
  surname: string;
  mobile_number: string;
  delegate_email: string;
  newsletter: string;
  site_key: string;
}): Promise<SimpleApiResponse> {
  return fetchGet<SimpleApiResponse>('client/add', {
    first_name: formData.first_name,
    surname: formData.surname,
    mobile_number: formData.mobile_number,
    delegate_email: formData.delegate_email,
    newsletter: formData.newsletter,
    site_key: formData.site_key,
  });
}

export async function forgotPassword(email: string): Promise<ApiResponse<unknown>> {
  const siteKey = import.meta.env.VITE_SITE_KEY;
  return fetchPost<ApiResponse<unknown>>('client/forgot', {
    username: email,
    site_key: siteKey,
  });
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const site_key = import.meta.env.VITE_SITE_KEY;

  return fetchPost<LoginResponse>('client/authenticate', {
    username,
    password,
    site_key,
  });
}

export async function autoLogin(sessionMemberToken: string): Promise<LoginResponse> {
  const siteKey = import.meta.env.VITE_SITE_KEY;
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl || !siteKey) {
    throw new Error('API URL or Site Key is not defined in environment variables');
  }

  try {
    const response = await fetch(`${apiUrl}/client/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        session_member_token: sessionMemberToken,
        site_key: siteKey,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // Try to parse as JSON first, then check content-type if parsing fails
    const contentType = response.headers.get('content-type');
    const responseText = await response.text();
    
    try {
      // Attempt to parse as JSON
      const jsonData = JSON.parse(responseText);
      return jsonData;
    } catch {
      // If JSON parsing fails, check content-type and provide better error
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Server returned non-JSON response: ${responseText.substring(0, 200)}...`);
      } else {
        // Content-type says JSON but parsing failed
        throw new Error(`Server returned invalid JSON: ${responseText.substring(0, 200)}...`);
      }
    }
  } catch (error) {
    console.error('Autologin error:', error);
    throw error;
  }
}

export async function getLatestArticle(siteKey: string, memberCode: string): Promise<Article> {
  try {
  const response = await fetchGet<ApiResponse<Article>>('article/article', {
      method: 'latest',
      site_key: siteKey,
      session_member_token: memberCode,
    });

    if (!response.Success) {
      const errorMsg = Array.isArray(response.Msg) ? response.Msg[0] : 'message' in response.Msg ? response.Msg.message : 'Failed to fetch latest article';
      throw new Error(errorMsg);
    }

    const article = response.Msg as Article;
    if (article.OgImage) {
      article.OgImage = article.OgImage.startsWith('../')
        ? `${import.meta.env.VITE_API_ROOT_DOMAIN}/${article.OgImage.replace(/^\.\.\//g, '')}`
        : article.OgImage;
    }
    return article;
  } catch (error) {
    console.error('Error fetching latest article:', error);
    throw error;
  }
}

export async function getArticleById(articleId: string, siteKey: string, memberCode: string): Promise<Article> {
  try {
  const response = await fetchGet<ApiResponse<Article>>('article/article', {
      method: 'request',
      article_id: articleId,
      site_key: siteKey,
      session_member_token: memberCode,
    });

    if (!response.Success) {
      const errorMsg = Array.isArray(response.Msg) ? response.Msg[0] : 'message' in response.Msg ? response.Msg.message : 'Failed to fetch article';
      throw new Error(errorMsg);
    }

    const article = response.Msg as Article;
    if (article.OgImage) {
      article.OgImage = article.OgImage.startsWith('../')
        ? `${import.meta.env.VITE_API_ROOT_DOMAIN}/${article.OgImage.replace(/^\.\.\//g, '')}`
        : article.OgImage;
    }
    return article;
  } catch (error) {
    console.error(`Error fetching article with id ${articleId}:`, error);
    throw error;
  }
}

export async function getArticleByTitle(title: string, siteKey: string, memberCode: string): Promise<Article> {
  try {
  const response = await fetchGet<ApiResponse<Article>>('article/article', {
      method: 'title',
      title,
      site_key: siteKey,
      session_member_token: memberCode,
    });

    if (!response.Success) {
      const errorMsg = Array.isArray(response.Msg) ? response.Msg[0] : 'message' in response.Msg ? response.Msg.message : 'Failed to fetch article by title';
      throw new Error(errorMsg);
    }

    const article = response.Msg as Article;
    if (article.OgImage) {
      article.OgImage = article.OgImage.startsWith('../')
        ? `${import.meta.env.VITE_API_ROOT_DOMAIN}/${article.OgImage.replace(/^\.\.\//g, '')}`
        : article.OgImage;
    }
    return article;
  } catch (error) {
    console.error(`Error fetching article with title ${title}:`, error);
    throw error;
  }
}

export async function getLatestTenArticles(siteKey: string, memberCode: string): Promise<Article[]> {
  try {
  const response = await fetchGet<ApiResponse<Article[]>>('article/article', {
      method: 'latest10',
      site_key: siteKey,
      session_member_token: memberCode,
    });

    if (!response.Success) {
      const errorMsg = 'Failed to fetch latest ten articles';
      throw new Error(errorMsg);
    }

    const articles = Array.isArray(response.Msg) ? response.Msg : [response.Msg];
    return articles.map((article: Article) => ({
      ...article,
      OgImage: article.OgImage && article.OgImage.startsWith('../')
        ? `${import.meta.env.VITE_API_ROOT_DOMAIN}/${article.OgImage.replace(/^\.\.\//g, '')}`
        : article.OgImage,
    }));
  } catch (error) {
    console.error('Error fetching latest ten articles:', error);
    throw error;
  }
}

// export async function getWebinarEvent(eventId: string, memberCode: string, siteKey: string): Promise<WebinarStreamingData> {
//   const apiUrl = import.meta.env.VITE_API_URL;
//   try {
//     const params = {
//       event_id: eventId,
//       session_member_token: memberCode || '',
//       site_key: siteKey,
//       method: 'specific',
//     };
//     console.log(`Calling getWebinarEvent: ${JSON.stringify(params)}`);
//     const response = await api.get<ApiResponse>(`${apiUrl}/education/events`, { params });

//     if (!response.data) {
//       throw new Error('Empty response from server');
//     }

//     const data = response.data;
//     if (!data.Success) {
//       const errorMsg = Array.isArray(data.Msg) ? data.Msg[0] : 'message' in data.Msg ? data.Msg.message : 'Failed to fetch webinar event';
//       console.error(`getWebinarEvent failed: ${errorMsg}`);
//       throw new Error(errorMsg);
//     }

//     // Map data.Msg (WebinarEvent) to WebinarStreamingData
//     console.log('Webinar Event Msg:', data.Msg);
//     const msg = data.Msg as WebinarEvent;
//     const streamingData: WebinarStreamingData = {
//       EventId: msg.EventId,
//       SeminarId: msg.SeminarId,
//       SeminarName: msg.SeminarName,
//       EventDate: msg.EventDate,
//       StartTime: msg.StartTime,
//       DurationCode: msg.DurationCode,
//       DurationQuantity: msg.DurationQuantity,
//       LanguageCode: msg.LanguageCode,
//       SeminarImage: msg.SeminarImage,
//       Description: msg.Description,
//       Content: msg.Content,
//       Access: msg.Access, // or null/undefined if not present
//       SocialImage: msg.SocialImage,
//       EmbeddedCode: msg.EmbeddedCode,
//       Name: msg.Name,
//       // ...add any other required fields, use fallback values if needed
//     };

//     return streamingData;
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : 'Failed to fetch webinar event';
//     console.error(`Error in getWebinarEvent for eventId=${eventId}: ${errorMessage}`, error);
//     throw new Error(errorMessage);
//   }
// }

export async function getWebinarAccess(eventId: string, email: string, memberCode: string, siteKey: string): Promise<WebinarAccess> {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const body = {
      event_id: eventId,
      event_delegate_email: email,
      session_member_token: memberCode || '',
      site_key: siteKey,
      method: 'login_access',
    };
    // console.log(`Calling getWebinarAccess: ${JSON.stringify(body)}`);
    const response = await api.post<WebinarAccess>(`${apiUrl}/education/webinar-view`, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: [(data) => new URLSearchParams(data).toString()],
    });

    if (!response.data) {
      throw new Error('Empty response from server');
    }

    const data = response.data;
    // if (!data.Success) {
    //   //const errorMsg = Array.isArray(data.Msg) ? data.Msg[0] : 'message' in data.Msg ? data.Msg.message : 'Failed to grant access';
    //   const errorMsg = typeof data.Msg === 'string' ? data.Msg : 'Failed to grant access';
    //   console.error(`getWebinarAccess failed: ${errorMsg}`);
    //   throw new Error(errorMsg);
    // }

    // console.log('Webinar Access Msg:', data);

    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to grant webinar access';
    // console.error(`Error in getWebinarAccess for eventId=${eventId}, email=${email}: ${errorMessage}`, error);
    throw new Error(errorMessage);
  }
}

export async function getWebinarAccessByCookie(eventId: string, memberCode: string, siteKey: string): Promise<WebinarAccess> {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const body = {
      event_id: eventId,
      session_member_token: memberCode || '',
      site_key: siteKey,
    };
    console.log(`Calling getWebinarAccessByCookie: ${JSON.stringify(body)}`);
    const response = await api.post<WebinarAccess>(`${apiUrl}/education/webinar-view`, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: [(data) => new URLSearchParams(data).toString()],
    });

    if (!response.data) {
      throw new Error('Empty response from server');
    }

    const data = response.data;
    if (!data.Success) {
      const errorMsg = Array.isArray(data.Msg) ? data.Msg[0] : 'message' in data.Msg ? data.Msg.message : 'Failed to grant access';
      console.error(`getWebinarAccessByCookie failed: ${errorMsg}`);
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to grant webinar access by cookie';
    console.error(`Error in getWebinarAccessByCookie for eventId=${eventId}: ${errorMessage}`, error);
    throw new Error(errorMessage);
  }
}

export async function getStreamingWebinarById(eventId: string, siteKey: string, memberCode: string, email: string = ''): Promise<WebinarStreamingData> {
  try {
    if (!siteKey) {
      throw new Error('Site key is not defined');
    }
    if (!eventId) {
      throw new Error('Event ID is not defined');
    }
    if (!memberCode && !email) {
      console.log(`No memberCode or email provided for webinar access: eventId=${eventId}`);
      throw new Error('Email required to access webinar');
    }

    const accessResponse = await getWebinarAccess(eventId, email || '', memberCode, siteKey);
    if (!accessResponse.Success) {
      let errorMessage: string;
      if (typeof accessResponse.Msg === 'string') {
        errorMessage = accessResponse.Msg;
      } else if (Array.isArray(accessResponse.Msg)) {
        errorMessage = accessResponse.Msg[0] || 'Failed to retrieve webinar access';
      } else {
        errorMessage = 'Failed to retrieve webinar access';
      }
      throw new Error(errorMessage);
    }

    // Map getWebinarAccess response to WebinarStreamingData
    const { Msg } = accessResponse;
    // console.log('Webinar Access Msg:', Msg);
    // Adjust SeminarImage and BannerImage URLs
    const apiRootDomain = import.meta.env.VITE_API_ROOT_DOMAIN || import.meta.env.VITE_API_URL;
    let seminarImage = Msg.Image || '';
    let bannerImage = Msg.Image || '';
    if (seminarImage && seminarImage.startsWith('../')) {
      seminarImage = `${apiRootDomain}/${seminarImage.replace(/^\.\.\//g, '')}`;
    }
    if (bannerImage && bannerImage.startsWith('../')) {
      bannerImage = `${apiRootDomain}/${bannerImage.replace(/^\.\.\//g, '')}`;
    }

    return {
      SeminarId: Msg.SeminarId,
      EventId: Msg.EventId,
      Title: Msg.Name || 'Webinar',
      EventDate: Msg.EventDate,
      StartTime: new Date(Msg.EventDate).toTimeString().split(' ')[0], // Extract time from EventDate
      DurationCode: 'DUR-H', // Default, adjust if backend provides this
      DurationQuantity: 2, // Default, adjust if backend provides this
      LanguageCode: 'LANG-E', // Default, adjust based on context
      SeminarName: Msg.Name || 'Webinar', // Fallback name
      SeminarImage: seminarImage,
      BannerImage: bannerImage,
      Description: '',
      Content: '',
      Access: accessResponse,
      SocialImage: bannerImage,
      EmbeddedCode: Msg.EmbeddedCode,
      Name: Msg.Name,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to grant webinar access';
    console.error(`Error in getStreamingWebinarById for eventId=${eventId}, email=${email}: ${errorMessage}`, error);
    throw new Error(errorMessage);
  }
}

// Mark a webinar as attended
export async function setWebinarAsAttended(enrolmentId: number, siteKey: string, memberCode: string): Promise<ApiResponse<unknown>> {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const params = new URLSearchParams({
      method: 'attended',
      enrolment_id: enrolmentId.toString(),
      site_key: siteKey,
      session_member_token: memberCode,
    });

    const response = await fetch(`${apiUrl}/education/webinar?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // Check for empty response body
    const text = await response.text();
    if (!text) {
      // Return a default success response if backend returns no content
      return { Success: true, Msg: 'No content returned', AlertType: 'success' };
    }
    // Try to parse JSON
    return JSON.parse(text);
  } catch (error) {
    console.error('Error marking webinar as attended:', error);
    throw error;
  }
}

// Send post-webinar notification
export async function sendPostWebinarNotification(enrolmentId: number, siteKey: string, memberCode: string): Promise<ApiResponse<unknown>> {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const params = new URLSearchParams({
      method: 'email',
      enrolment_id: enrolmentId.toString(),
      site_key: siteKey,
      session_member_token: memberCode,
    });

    const response = await fetch(`${apiUrl}/education/webinar?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const text = await response.text();
    if (!text) {
      // Return a default success response if backend returns no content
      return { Success: true, Msg: 'No content returned', AlertType: 'success' };
    }
    // Try to parse JSON
    return JSON.parse(text);
  } catch (error) {
    console.error('Error sending post-webinar notification:', error);
    throw error;
  }
}

export async function bookWebinar(
  eventId: string,
  firstName: string,
  surname: string,
  email: string,
  mobile: string,
  memberCode: string,
  siteKey: string
): Promise<{ Success: boolean; Msg: unknown }> {
  const payload = {
    'first-name-1': firstName,
    'last-name-1': surname,
    'email-reg-1': email,
    'phone-reg-1': mobile,
    'event-id': eventId,
    'origin-1': 'WMC Popup Booking',
    site_key: siteKey,
    session_member_token: memberCode,
  };
  console.log('bookWebinar payload:', payload, 'encoded:', new URLSearchParams(payload).toString());
  return fetchPost('education/event-booking', payload, false);
}

export const updateProfileSettingsData = async (memberCode: string, siteKey: string, formData: ProfileFormData) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const nativeFormData = new FormData();
    nativeFormData.append('method', 'set');
    nativeFormData.append('site_key', siteKey);
    nativeFormData.append('session_member_token', memberCode);
    nativeFormData.append('data_set', 'core-personal-details');
    for (const [key, value] of Object.entries(formData)) {
      nativeFormData.append(key, String(value));
    }

    const response = await fetch(`${apiUrl}/client/profile-details`, {
      method: 'POST',
      body: nativeFormData,
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating profile settings data:', error);
    throw error;
  }
};

export const updatePasswordData = async (memberCode: string, siteKey: string, password: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const nativeFormData = new FormData();
    nativeFormData.append('method', 'set');
    nativeFormData.append('data_set', 'password');
    nativeFormData.append('site_key', siteKey);
    nativeFormData.append('session_member_token', memberCode);
    nativeFormData.append('password', password);

    const response = await fetch(`${apiUrl}/client/profile-details`, {
      method: 'POST',
      body: nativeFormData,
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating password data:', error);
    throw error;
  }
};

// Dashboard endpoints
export const getDashboardStats = async (memberData?: MemberData): Promise<DashboardStats> => {
  if (memberData) {
    return {
      AnnualCommission: memberData.AnnualCommission.toString(),
      totalCommission: memberData.ClubUnitAmount,
      clubUnits: memberData.ClubUnits,
      growthRate: memberData.ClubUnitGrowth.toString(),
      eventsThisMonth: memberData.Events?.length || 0,
    };
  }

  return {
    AnnualCommission: '0',
    totalCommission: '0',
    clubUnits: '0',
    growthRate: '0',
    eventsThisMonth: 0,
  };
};

export const getUpcomingEvents = async (memberData?: MemberData): Promise<Event[]> => {
  if (memberData && memberData.Events && memberData.Events.length > 0) {
    return memberData.Events.map((event) => ({
      SeminarName: event.SeminarName,
      EventDate: event.EventDate,
      StartTime: event.StartTime,
      Venue: event.Venue,
      SocialImage: event.SocialImage,
      // Keep legacy fields for backward compatibility
      title: event.SeminarName,
      date: formatDate(event.EventDate),
      time: formatTime(event.StartTime),
      event_image: event.EventImage,
      social_image: event.SocialImage,
    }));
  }

  return [];
};

export const getReferralSettings = async (memberCode: string, siteKey: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    const params = new URLSearchParams({
      method: 'compounding_settings',
      site_key: siteKey,
      session_member_token: memberCode,
    });

    const response = await fetch(`${apiUrl}/client/dashboard?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching referral settings:', error);
    throw error;
  }
};

export const getReferralSummary = async (memberCode: string, siteKey: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    const params = new URLSearchParams({
      method: 'referrals_linear',
      site_key: siteKey,
      session_member_token: memberCode,
    });

    const response = await fetch(`${apiUrl}/client/dashboard?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching referral summary:', error);
    throw error;
  }
};

export const getInvoiceHistory = async (memberCode: string, siteKey: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    const params = new URLSearchParams({
      method: 'invoice_history',
      site_key: siteKey,
      session_member_token: memberCode,
    });

    const response = await fetch(`${apiUrl}/client/dashboard?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching invoice history:', error);
    throw error;
  }
};

export const getCommissionData = async (memberCode: string, siteKey: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    const params = new URLSearchParams({
      method: 'linear_referral_commision',
      site_key: siteKey,
      session_member_token: memberCode,
    });

    const response = await fetch(`${apiUrl}/client/dashboard?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching commission data:', error);
    throw error;
  }
};

export const acceptTermsAndConditions = async (memberCode: string, siteKey: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/organisation/terms-and-conditions?site_key=${siteKey}&session_member_token=${memberCode}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error accepting terms and conditions:', error);
    throw error;
  }
};

export const getClubUnitData = async (memberCode: string, siteKey: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    const params = new URLSearchParams({
      method: 'dashboard',
      site_key: siteKey,
      session_member_token: memberCode,
    });

    const response = await fetch(`${apiUrl}/client/club-unit-dashboard?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching club unit data:', error);
    throw error;
  }
};

export const redeemClubUnits = async (memberCode: string, siteKey: string, units: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/monetary/redeem?type=club_units&redeem-units=${units}&site_key=${siteKey}&session_member_token=${memberCode}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error redeeming club units:', error);
    throw error;
  }
};

export const submitInvoice = async (memberCode: string, siteKey: string, amount: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    const params = new URLSearchParams({
      method: 'submit',
      amount,
      site_key: siteKey,
      session_member_token: memberCode,
    });

    const response = await fetch(`${apiUrl}/monetary/invoice_submission?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error submitting invoice:', error);
    throw error;
  }
};

// Profile endpoints
export const getUserProfile = async (memberData?: MemberData) => {
  if (memberData) {
    return {
      name: `${memberData.FirstNames} ${memberData.Surname}`,
      email: memberData.Email,
      role: memberData.MemberStatusDescription,
    };
  }

  return {
    name: 'Johan Harmzen',
    email: 'jharmzen@dhrystone.co.za',
    role: 'Platinum Elite Member',
  };
};

  /**
   * Fetch payment feedback for a given invoice ID
   * @param invoiceId string
   * @returns ApiResponse
   */
  export async function handlePaymentFeedback(invoiceId: string): Promise<ApiResponse<unknown>> {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      throw new Error('API URL is not defined in environment variables');
    }
    const endpoint = `${apiUrl}/client/payment-feedback?invoice_id=${invoiceId}`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return response.json();
  }
export const updateCompoundingPercentage = async (memberCode: string, siteKey: string, percentage: number) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/client/action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        method: 'compound_preference',
        value: percentage.toString(),
        site_key: siteKey,
        session_member_token: memberCode,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating compounding percentage:', error);
    throw error;
  }
};

export const submitContactRequest = async (
  memberData: MemberData | null,
  siteKey: string,
  message: string,
  contactDetails?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }
) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    // Use member data if available, otherwise use provided contact details
    const firstName = memberData?.FirstNames || contactDetails?.firstName || '';
    const lastName = memberData?.Surname || contactDetails?.lastName || '';
    const phone = memberData?.Phone || contactDetails?.phone || '';
    const email = memberData?.Email || contactDetails?.email || '';
    const memberCode = memberData?.MemberCode || '';

    const params = new URLSearchParams({
      method: 'submit',
      request_from_FirstNames: firstName,
      request_from_Surname: lastName,
      request_from_Phone: phone,
      request_from_Email: email,
      request_from_Subject: 'Member Portal Contact Request',
      request_from_Comment: message,
      site_key: siteKey,
      session_member_token: memberCode,
    });

    const response = await fetch(`${apiUrl}/communication/contact-request?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Try to parse as JSON first, then check content-type if parsing fails
    const contentType = response.headers.get('content-type');
    const responseText = await response.text();
    
    try {
      // Attempt to parse as JSON
      const jsonData = JSON.parse(responseText);
      return jsonData;
    } catch {
      // If JSON parsing fails, check content-type and provide better error
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Server returned non-JSON response: ${responseText.substring(0, 200)}...`);
      } else {
        // Content-type says JSON but parsing failed
        throw new Error(`Server returned invalid JSON: ${responseText.substring(0, 200)}...`);
      }
    }
  } catch (error) {
    console.error('Error submitting contact request:', error);
    throw error;
  }
};

export const getQuestionnaireData = async (memberCode: string, siteKey: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    const params = new URLSearchParams({
      method: 'get',
      site_key: siteKey,
      session_member_token: memberCode,
    });

    const response = await fetch(`${apiUrl}/client/assessment?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching questionnaire data:', error);
    throw error;
  }
};

export const updateQuestionnaireData = async (memberCode: string, siteKey: string, formData: QuestionnaireFormData) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    const nativeFormData = new FormData();
    nativeFormData.append('method', 'set');
    nativeFormData.append('site_key', siteKey);
    nativeFormData.append('session_member_token', memberCode);
    for (const [key, value] of Object.entries(formData)) {
      nativeFormData.append(key, String(value));
    }

    const response = await fetch(`${apiUrl}/client/assessment`, {
      method: 'POST',
      body: nativeFormData,
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating questionnaire data:', error);
    throw error;
  }
};

export const getAffordabilityData = async (memberCode: string, siteKey: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    const params = new URLSearchParams({
      method: 'get',
      site_key: siteKey,
      session_member_token: memberCode,
    });

    const response = await fetch(`${apiUrl}/client/questionnaire?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching affordability data:', error);
    throw error;
  }
};

export const updateAffordabilityData = async (memberCode: string, siteKey: string, formData: AffordabilityFormData) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    const nativeFormData = new FormData();
    nativeFormData.append('method', 'set');
    nativeFormData.append('site_key', siteKey);
    nativeFormData.append('session_member_token', memberCode);
    for (const [key, value] of Object.entries(formData)) {
      nativeFormData.append(key, String(value));
    }

    const response = await fetch(`${apiUrl}/client/questionnaire`, {
      method: 'POST',
      body: nativeFormData,
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating affordability data:', error);
    throw error;
  }
};

export const getCourseModules = async (courseId: number, memberCode: string, siteKey: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const params = new URLSearchParams({
      session_member_token: memberCode,
      site_key: siteKey,
    });

    const response = await fetch(`${apiUrl}/education/online-course/course/${courseId}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching course modules:', error);
    throw error;
  }
};

export const getCourseDetails = async (moduleId: number, memberCode: string, siteKey: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL + '/education/online-course/chapter/' + moduleId;
    const params = new URLSearchParams({
      session_member_token: memberCode,
      site_key: siteKey,
    });

    const response = await fetch(`${apiUrl}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching course details:', error);
    throw error;
  }
};

export const emailChapter = async (moduleId: number, memberCode: string, siteKey: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL + '/education/online-course/email/' + moduleId;
    const params = new URLSearchParams({
      method: 'email',
      chapter_id: moduleId.toString(),
      session_member_token: memberCode,
      site_key: siteKey,
    });

    const response = await fetch(`${apiUrl}?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error emailing chapter:', error);
    throw error;
  }
};

export const getCourseTest = async (moduleId: number, memberCode: string, siteKey: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL + '/education/online-course/test/' + moduleId;
    const params = new URLSearchParams({
      session_member_token: memberCode,
      site_key: siteKey,
    });

    const response = await fetch(`${apiUrl}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching course test:', error);
    throw error;
  }
};

export const submitCourseTest = async (
  moduleId: number,
  payload: { testAnswers: Record<number, number>; surveyAnswers?: Record<string, string> },
  memberCode: string,
  siteKey: string
) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const params = new URLSearchParams({
      method: 'test_submission',
      chapter_id: moduleId.toString(),
      'test-chapter_id': moduleId.toString(),
      session_member_token: memberCode,
      site_key: siteKey,
    });

    Object.entries(payload.testAnswers).forEach(([questionId, answerIndex]) => {
      params.append(`answer_${questionId}`, answerIndex.toString());
    });

    if (payload.surveyAnswers) {
      Object.entries(payload.surveyAnswers).forEach(([questionId, answer]) => {
        params.append(`survey_${questionId}`, answer);
      });
    }

    const response = await fetch(`${apiUrl}/education/online-course/submit?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error submitting course test:', error);
    throw error;
  }
};

export const getWebinarById = async (seminarId: string, siteKey: string, memberCode: string): Promise<WebinarData> => {
  // console.log('Webinar fetch api call');

  try {
    const apiUrl = import.meta.env.VITE_API_URL + '/education/seminar-details';
    const params = new URLSearchParams({
      seminar_id: seminarId,
      session_member_token: memberCode,
      site_key: siteKey,
    });

    const response = await fetch(`${apiUrl}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: { 
      Success: boolean; 
      Msg: {
        Title: string;
        EventId: string | null;
        SeminarImage: string;
        Content: string;
        Description: string;
        BookingLink?: string;
      }
    } = await response.json();
    if (data.Success && !Array.isArray(data.Msg) && 'Title' in data.Msg) {
      return {
        Title: data.Msg.Title,
        EventId: data.Msg.EventId,
        SeminarImage: data.Msg.SeminarImage || '',
        Content: data.Msg.Content,
        Description: data.Msg.Description,
        BookingLink: data.Msg.BookingLink || undefined,
      };
    } else {
      throw new Error(
        Array.isArray(data.Msg) ? data.Msg[0] : 'message' in data.Msg ? data.Msg.message : 'Failed to fetch webinar'
      );
    }
  } catch (error) {
    console.error('Error fetching webinar details:', error);
    throw error;
  }
};


export async function getContactRequest(requestId: string, siteKey: string, memberCode: string): Promise<ExistingContactRequest> {
  try {
  const response = await fetchGet<ApiResponse<ExistingContactRequest>>('communication/contact-request', {
      method: 'get_rfc',
      request_id: requestId,
      site_key: siteKey,
      session_member_token: memberCode,
    });

    if (!response.Success || Array.isArray(response.Msg)) {
      const errorMsg = Array.isArray(response.Msg)
        ? response.Msg[0]
        : typeof response.Msg === 'object' && response.Msg && 'message' in response.Msg ? (response.Msg as { message: string }).message : 'Failed to fetch contact request';
      throw new Error(errorMsg);
    }
    return response.Msg;
  } catch (error) {
    console.error(`Error fetching contact request with id ${requestId}:`, error);
    throw error;
  }
}

export async function getAssignees(siteKey: string, memberCode: string): Promise<Assignee[]> {
  try {
  const response = await fetchGet<ApiResponse<Record<string, string>>>('communication/contact-request-reassignees', {
      site_key: siteKey,
      session_member_token: memberCode,
    });

    if (!response.Success) {
      const errorMsg = Array.isArray(response.Msg)
        ? response.Msg[0]
        : 'message' in response.Msg
        ? response.Msg.message
        : 'Failed to fetch assignees';
      throw new Error(errorMsg);
    }

    if (typeof response.Msg !== 'object' || response.Msg === null || Array.isArray(response.Msg)) {
      throw new Error('Invalid response format: expected object for assignees');
    }
    // Transform associative array to list of objects
    return Object.entries(response.Msg).map(([id, name]) => ({
      id: parseInt(id, 10),
      name: String(name),
    }));
  } catch (error) {
    console.error('Error fetching assignees:', error);
    throw error;
  }
}

export async function reassignContactRequest(
  requestId: string,
  reassignTo: string,
  siteKey: string,
  memberCode: string
): Promise<ApiResponse<unknown>> {
  return fetchGet<ApiResponse<unknown>>('communication/contact-request', {
    method: 'reassign_rfc',
    request_id: requestId,
    to_sp_id: reassignTo,
    site_key: siteKey,
    session_member_token: memberCode,
  });
}

// Add auth interceptor
api.interceptors.request.use((config) => {
  try {
    const storedState = localStorage.getItem('appState');
    if (storedState) {
      const { memberData } = JSON.parse(storedState);
      if (memberData && memberData.MemberCode) {
        config.headers.Authorization = `Bearer ${memberData.MemberCode}`;
      }
    }
  } catch (error) {
    console.error('Error setting auth header:', error);
  }
  return config;
});

export async function submitRating(
  memberData: MemberData | null,
  ratingType: 'very_bad' | 'bad' | 'average' | 'good' | 'excellent',
  requestId: string = '',
  comment: string = ''
): Promise<ApiResponse<unknown>> {
  const siteKey = import.meta.env.VITE_SITE_KEY || 'WMC-LIVE';

  const ratingValueMap: Record<string, string> = {
    very_bad: '1',
    bad: '2',
    average: '3',
    good: '4',
    excellent: '5',
  };

  const ratingValue = ratingValueMap[ratingType];

  const params = new URLSearchParams({
    method: 'rating_submission',
    site_key: siteKey,
    request_id: requestId,
    rating_value: ratingValue,
    rating_comment: comment,
  });

  // Only add member data if available (for logged-in users)
  if (memberData) {
    params.append('member_code', memberData.MemberCode);
    params.append('member_email', memberData.Email);
  }

  const url = `${import.meta.env.VITE_API_URL}/organisation/rating?${params.toString()}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export const eventService = {
  getEvents: async (): Promise<AjaxResponse & { events?: any[] }> => {
    const response = await api.get('/events');
    return response.data;
  },

  bookEvent: async (eventId: number): Promise<AjaxResponse> => {
    const response = await api.post('/events/book', { eventId });
    return response.data;
  },

  getBookings: async (): Promise<AjaxResponse & { bookings?: any[] }> => {
    const response = await api.get('/events/bookings');
    return response.data;
  },
};