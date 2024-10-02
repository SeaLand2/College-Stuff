#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "colour.h"

void inv_add(char* item, int amount)
{
  // sword, gold, HP potion, mana potion, spell

  extern int inventory[];

  if ((strncmp(item, "swor", 4) == 0)) // add sword
  {
    inventory[0] = 1;
  }
  else if ((strncmp(item, "gold", 4) == 0)) // gold
  {
    inventory[1] += amount;
  }
  else if ((strncmp(item, "hpot", 4) == 0)) // HP potion
  {
    inventory[2] += amount;
  }
  else if ((strncmp(item, "mpot", 4) == 0)) // Mana potion
  {
    inventory[3] += amount;
  }
  else if ((strncmp(item, "spel", 4) == 0)) // spell
  {
    inventory[4] = amount;
  }
}

void inv_see()
{
  extern int inventory[];
  int spacer = 0;
  if (inventory[0] != 0)
  {
    printf("Sword, ");
    spacer = 1;
  }
  if (inventory[1] != 0)
  {
    printf("%d Gold [G], ", inventory[1]);
    spacer = 1;
  }
  if (inventory[2] != 0)
  {
    printf("%d HP potion [H], ", inventory[2]);
    spacer = 1;
  }
  if (inventory[3] != 0)
  {
    printf("%d Mana potion [M], ", inventory[3]);
    spacer = 1;
  }
  if (inventory[4] == 1)
  {
    printf("Fireball spell [S], ");
    spacer = 1;
  }
  else if (inventory[4] == 2)
  {
    printf("Healing spell [S], ");
    spacer = 1;
  }
  if (spacer == 1)
    printf("\n\n");
}

int inv_use(char item[1], int amount)
{
  extern int inventory[];
  int error;

  if (((item[0] == 'G') || (item[0] == 'g')) && (inventory[1] > 0)) // gold
  {
    inventory[1] -= amount;
    return 1;
  }
  else if (((item[0] == 'H') || (item[0] == 'h')) && (inventory[2] > 0)) // HP potion
  {
    inventory[2] -= amount;
    return 2;
  }
  else if (((item[0] == 'M') || (item[0] == 'm')) && (inventory[3] > 0)) // Mana potion
  {
    inventory[3] -= amount;
    return 3;
  }
  else
    return 0; // produces error
}