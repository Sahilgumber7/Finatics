import supabase from "../supabaseClient";

export async function addTransaction({ user_id, amount, type, description, category }) {
  const { data, error } = await supabase.from("transactions").insert([
    { user_id, amount, type, description, category }, // Added category
  ]);
  if (error) throw error;
  return data;
}


// Get transactions for a user and filter them by time period
export async function getTransactions(user_id, timePeriod) {
  const fromDate = getFromDate(timePeriod); // Get the date based on the selected time period

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user_id)
    .gte("created_at", fromDate) // Filter transactions based on date
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// Get totals (income, expense, balance)
export async function getTransactionTotals(user_id) {
  const { data, error } = await supabase.rpc("get_user_totals", { uid: user_id });
  if (error) throw error;
  return data;
}

// Get transactions within a specific time period  
// Add helper function to calculate the start date based on selected time period
export const getFromDate = (timePeriod) => {
    const now = new Date();
    switch (timePeriod) {
      case "week": {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const day = date.getDay(); // Sunday = 0
  const diff = date.getDate() - day;
  return new Date(date.setDate(diff));
} // Start of the week (Sunday)
      case "month":
        return new Date(now.getFullYear(), now.getMonth(), 1); // First day of current month
      case "lastMonth":
        return new Date(now.getFullYear(), now.getMonth() - 1, 1); // First day of last month
      case "year":
        return new Date(now.getFullYear(), 0, 1); // First day of current year
      case "last12":
        return new Date(now.setFullYear(now.getFullYear() - 1)); // Same date last year
      default:
        return null;
    }
  };
  
  // Modify this to ensure you're returning the date in a valid format
export const getFormattedDate = (date) => {
    return date.toISOString(); // Convert to ISO format (UTC)
  };
  

  export async function updateTransaction(id, { amount, description, type }) {
    const { data, error } = await supabase
      .from("transactions")
      .update({ amount, description, type })
      .eq("id", id);
    if (error) throw error;
    return data;
  }
  
  export async function deleteTransaction(id) {
    const { data, error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return data;
  }
  