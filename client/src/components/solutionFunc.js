function solutionFunc(solution) {
  if (solution === null) {
    return "submitted \"no solution\"";
  } else if (solution === undefined) {
    return "never submitted a solution";
  }
  return solution;
}
export default solutionFunc;