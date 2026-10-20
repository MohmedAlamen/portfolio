// +966535766391 -> +966 53 576 6391 (Saudi mobile grouping); other numbers are returned unchanged
export const formatPhone = p => p.replace(/^\+966(\d{2})(\d{3})(\d{4})$/, '+966 $1 $2 $3')
export const waLink = p => `https://wa.me/${p.replace(/\D/g, '')}`
