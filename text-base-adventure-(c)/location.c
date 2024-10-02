#include <stdio.h>

#include "clear.h"

char* location(char area)
{
  char* temp;
  if(area == 's')
    temp = "Street";

  if(area == 'f')
    temp = "Forest";

  if(area == 'w')
    temp = "Wall";

  if(area == 'C')
    temp = "Castle";

  if(area == 'c')
    temp = "Casino"; 

  if(area == 'y')
    temp = "Grave Yard";

  if(area == 'l')
    temp = "Lake"; 

  if(area == 'i')
    temp = "Island";

  if(area == 'I')
    temp = "Inn";

  if(area == 'B')
    temp = "Bridge";

  if(area == 'g')
    temp = "Gate";

  if(area == 'h')
    temp = "Hospital";

  if(area == 'b')
    temp = "Blacksmith";

  if(area == 'G')
    temp = "General Store";

  if(area == 't')
    temp = "Mage Tower";
  
  if(area == 'm')
    temp = "Mountain";

  if(area == 'x')
    temp = "Camp";

  if(area == 'X')
    temp = "Cave";

  if(area == 'a')
    temp = "Arena";

  return temp;
}

void castle()
{
  extern int boss;
  clrscr();
  if (boss == 1)
  {
    printf("You walk into the Castle.\n");
    printf("Across the hall is the King sitting upon his throne.\n");

    getchar();

    clrscr();

    printf("'Our kingdom is being threatened by the bandit warlord.\n");
    printf("His arena is located south of this castle beyond the\n");
    printf("camps of bandits.'\n\n");

    printf("'I ask upon you brave warrior, please bring peace back\n");
    printf("to our kingdom and make sure to return back after.'\n");

    getchar();

    clrscr();
  }
  else
  {
    printf("'Thank you brave warrior for returning peace back\n");
    printf("to the kingdom.\n");
    printf("There is no way i can possible repay you.'\n");

    getchar();

    clrscr();
  }
}