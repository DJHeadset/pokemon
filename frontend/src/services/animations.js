exports.showAttackNumber = () => {
  const damageElement = document.getElementById("attackNumber");
  const enemyDamageElement = document.getElementById("enemyAttackNumber");
  damageElement.classList.add("animated");
  enemyDamageElement.classList.add("animated");
  setTimeout(() => {
    damageElement.classList.remove("animated");
    enemyDamageElement.classList.remove("animated");
  }, 1000);
};
