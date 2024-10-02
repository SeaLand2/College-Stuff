#include <stdio.h>
#include <stdlib.h>

#include "casino.h"
#include "colour.h"
#include "clear.h"

void casino()
{
  extern int inventory[]; // sword, gold, HP potion, mana potion, spell
  char choice[1];
  int winnings, loss, chance;

  choice[0] = 'y';
  clrscr();
  
  printf("You enter the Casino\n\n");
  while ((choice[0] == 'y') || (choice[0] == 'Y'))
  {
    printf("You have ");
    yellow();
    printf("%d Gold\n", inventory[1]);
    reset();

    printf("Would you like to gamble ");
    yellow();
    printf("5 Gold ");
    reset();
    printf("Y/N ");
    scanf(" %c", &choice[0]);

    if ((choice[0] == 'y') || (choice[0] == 'Y'))
    {
      chance = rand() % 100;
      if (chance >= 89)
      {
        winnings = 50;
        if ((chance <=98) && (chance >=89))
          winnings = 10;
        printf("YOU WIN ");
        yellow();
        printf("%d Gold\n", winnings);
        reset();

        inventory[1] += winnings;
      }
      else
      {
        inventory[1] -= 5;
        printf("You lost the gamble\n");
      }
    }
    else if ((choice[0] == 'n') || (choice[0] == 'N'))
    {
      clrscr();
      return;
    }
    else
    {
      printf("Invalid option\n");
      choice[0] = 'y';
    }
    
    printf("\n\n");
    yellow();
    for (int i=0; i<60; i++)
    {
      printf("-");
    }
    reset();
    printf("\n\n");
  }
}