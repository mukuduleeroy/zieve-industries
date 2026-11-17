export interface ProfileSource { document: string; pages: readonly number[] }
export interface Sourced<T> { value: T; source: ProfileSource }
export interface ServiceDivision { slug: string; name: string; offerings: readonly string[]; clients: string; source: ProfileSource }
export interface IndustrySector { name: string; source: ProfileSource }
