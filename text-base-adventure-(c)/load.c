#include <stdio.h>

#include "load.h"
#include "clear.h"
#include "colour.h"

void load()
{
  clrscr();

  cyan();
  printf("GENERIC QUEST\n\n");
  reset();

  printf("Press ENTER to start\n");

  getchar();

  clrscr();

  printf("You awaken inside of an Inn and feel well rested\n");
  printf("However, your body still aches as if you had been\n");
  printf("in a battle and lost.\n\n");

  printf("On the table next to you you notice a coin purse.\n");
  printf("You look inside and it contains ");
  yellow();
  printf("20 Gold");
  reset();
  printf(".\n\n");

  printf("There is also a note saying to head to the Castle\n");
  printf("directly north, to begin your quest.\n");

  getchar();

  clrscr();
}
