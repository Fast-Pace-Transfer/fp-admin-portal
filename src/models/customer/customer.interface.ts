/**
 * @name Customer
 * @description
 * Describes the details of a customer
 * @memberof Customer
 * @property {string} id
 * @property {string | null} full_name
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {string} password
 * @property {string | null} date_of_birth
 * @property {string | null} place_of_birth
 * @property {string | null} gender
 * @property {string} phone_number
 * @property {string | null} phone_number_verified_at
 * @property {string | null} email_verified_at
 * @property {string} account_pin
 * @property {string} verification_code
 * @property {string} verification_code_expires_at
 * @property {string} active
 * @property {string} consumer_id
 * @property {string | null} address
 * @property {string | null} city
 * @property {string | null} zip_code
 * @property {string} resident_country
 * @property {string | null} document_type_id
 * @property {string | null} document_id
 * @property {string | null} document_issue_date
 * @property {string | null} document_expiry_date
 * @property {string | null} document_issuing_country
 * @property {string | null} document_front_image
 * @property {string | null} document_back_image
 * @property {string | null} face_image
 * @property {string | null} other_document_name
 * @property {number} email_verified
 * @property {number} document_uploaded
 * @property {number} address_stored
 * @property {number} personal_info_stored
 * @property {number} registration_completed
 * @property {string | null} last_login
 * @property {string | null} last_login_device
 * @property {string | null} deleted_at
 * @property {string} created_at
 * @property {string} updated_at
 */

export interface Customer {
    id: string;
    full_name: string | null;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    date_of_birth: string | null;
    place_of_birth: string | null;
    gender: string | null;
    phone_number: string;
    phone_number_verified_at: string | null;
    email_verified_at: string | null;
    account_pin: string;
    verification_code: string;
    verification_code_expires_at: string;
    active: string;
    consumer_id: string;
    address: string | null;
    city: string | null;
    zip_code: string | null;
    resident_country: string;
    document_type_id: string | null;
    document_id: string | null;
    document_issue_date: string | null;
    document_expiry_date: string | null;
    document_issuing_country: string | null;
    document_front_image: string | null;
    document_back_image: string | null;
    face_image: string | null;
    other_document_name: string | null;
    email_verified: number;
    document_uploaded: number;
    address_stored: number;
    personal_info_stored: number;
    registration_completed: number;
    last_login: string | null;
    last_login_device: string | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}