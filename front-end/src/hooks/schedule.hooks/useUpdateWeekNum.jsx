const useUpdateWeekNum = async (weekNum, currentUserId) => {
  if (!weekNum) {
    console.error("No week number provided - failed to save");
    return;
  }

  // api call to save currently focused week num to current authenticated user
  try {
    const response = await fetch("/api/user/update-week-num", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        weekNum,
        currentUserId,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Week number saved successfully");
    } else {
      console.error("Failed to save week number:", data);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

export default useUpdateWeekNum;
