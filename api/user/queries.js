import { API_URL } from "../api_url";
import { SIGN_UP_MUTATION , SIGN_IN_MUTATION } from "./mutations";

function createAuthHeaders(token) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }
  
  // Fonction pour se connecter
  export function signIn(username, password) {
    return fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: SIGN_IN_MUTATION,
        variables: { username, password }
      })
    })
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.errors) {
        throw new Error(jsonResponse.errors[0].message || 'Error signing in');
      }
      return jsonResponse.data.signIn;
    });
  }
  
  // Fonction pour s'inscrire
  export function signUp(username, password) {
    return fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: SIGN_UP_MUTATION,
        variables: { username, password }
      })
    })
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.errors) {
        throw new Error(jsonResponse.errors[0].message || 'Error signing up');
      }
      return jsonResponse.data.signUp;
    });
  }